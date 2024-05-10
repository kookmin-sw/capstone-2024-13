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
        
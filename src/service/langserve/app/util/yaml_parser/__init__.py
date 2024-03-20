class YamlParser:
	def __init__(self, filename):
		self.filename = filename
		try:
			with open(self.filename, 'r') as file:
				self.configuration = yaml.safe_load(file)
		except FileNotFoundError:
			raise FileNotFoundError(f"File not found: {self.filename}")
		except IOError:
			raise IOError(f"Fail to read file: {self.filename}")
		except yaml.YAMLError:
			raise yaml.YAMLError(f"Fail to parse yaml file: {self.filename}")

	def	__getitem__(self, key):
		return self.configuration[key]
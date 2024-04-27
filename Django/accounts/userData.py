
# userdata.py
class UserData:
    _instance = None

    def __init__(self):
        self._data = {}

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def set_data(self, key, value):
        self._data[key] = value

    def get_data(self, key):
        return self._data.get(key)

    def clear_data(self):
        self._data = {}
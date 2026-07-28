import time

accounts_list = [f"ACC{i}" for i in range(100000)]
accounts_dict = {f"ACC{i}": i for i in range(100000)}

target = "ACC99999"

start = time.perf_counter()
target in accounts_list
end = time.perf_counter()
print("List lookup:", end - start)

start = time.perf_counter()
target in accounts_dict
end = time.perf_counter()
print("Dictionary lookup:", end - start)
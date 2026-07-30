import socket

target_host = '127.0.0.1'
target_port = 9999

scanner = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Timeout set karna important hai, warna scan bahut slow ho jayega
scanner.settimeout(1)

result = scanner.connect_ex((target_host, target_port))

if result == 0:
    print(f"Port {target_port} is OPEN")
else:
    print(f"Port {target_port} is CLOSED")

scanner.close()
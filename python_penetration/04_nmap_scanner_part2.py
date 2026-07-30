import socket

target_host = '127.0.0.1'

print(f"Scanning target: {target_host}")
print("-" * 40)

for port in range(1, 1001):
    scanner = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    scanner.settimeout(0.5)
    
    result = scanner.connect_ex((target_host, port))
    
    if result == 0:
        print(f"Port {port} is OPEN")
    
    scanner.close()

print("-" * 40)
print("Scan complete!")
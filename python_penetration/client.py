import socket

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect(('127.0.0.1', 9999))
client.send(b"Hello Server, this is Aman!")

response = client.recv(4096)
print(f"Received from server: {response.decode('utf-8')}")

client.close()
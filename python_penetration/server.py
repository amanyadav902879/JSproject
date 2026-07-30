import socket

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(('0.0.0.0', 9999))
server.listen(5)
print("Server listening on port 9999...")

client_socket, client_address = server.accept()
print(f"Connection from {client_address} accepted!")

client_socket.send(b"Welcome to Aman's Test Server v1.0\n")

data = client_socket.recv(1024)
print(f"Received: {data.decode('utf-8')}")

client_socket.send(b"Message received loud and clear!")

client_socket.close()
server.close()
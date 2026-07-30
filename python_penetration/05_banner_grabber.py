import socket

def grab_banner(target_host, target_port):
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(2)
        s.connect((target_host, target_port))
        
        banner = s.recv(1024)
        print(f"Port {target_port}: {banner.decode('utf-8', errors='ignore').strip()}")
        
        s.close()
    except Exception as e:
        print(f"Port {target_port}: Could not grab banner ({e})")

target_host = '127.0.0.1'
target_port = 9999

grab_banner(target_host, target_port)
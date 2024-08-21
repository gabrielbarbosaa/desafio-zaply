import csv
import requests

# Defina a URL da API
url = "http://localhost:3001/products"

# Função para ler os produtos de um arquivo CSV
def read_products_from_csv(file_path):
    products = []
    with open(file_path, mode='r', encoding='utf-8') as file:
        csv_reader = csv.DictReader(file, delimiter=';')
        for row in csv_reader:
            product = {
                "id": int(row["id"]),
                "name": row["name"],
                "categories": row["categories"],
                "price": float(row["price"]),
                "brand": row["brand"],
                "image": None  # Definindo image como None (nulo)
            }
            products.append(product)
    return products

# Função para enviar os dados para a API
def register_products(products):
    for product in products:
        response = requests.post(url, json=product)
        if response.status_code == 201:
            print(f"Produto {product['name']} cadastrado com sucesso!")
        else:
            print(f"Erro ao cadastrar o produto {product['name']}: {response.status_code} - {response.text}")

# Caminho para o arquivo CSV
file_path = "products.csv"

# Ler os produtos do arquivo CSV
products = read_products_from_csv(file_path)

# Chama a função para registrar os produtos
register_products(products)
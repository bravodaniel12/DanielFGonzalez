import csv

# Función para obtener un nombre secuencial
def obtener_nombre_secuencial(indice, tipo):
    if tipo == 'desco':
        return f"desco{indice + 1}"
    elif tipo == 'otros':
        return f"otros{indice - 20 + 1}"

# Función para agregar números al archivo CSV
def agregar_numeros(numeros, archivo):
    with open(archivo, 'w', newline='') as f:
        writer = csv.writer(f)
        
        tipo = 'desco'  # Comienza con el tipo 'desco'
        for i, numero in enumerate(numeros):
            nombre = obtener_nombre_secuencial(i, tipo)
            writer.writerow([nombre, numero])
            # Cambiar el tipo a 'otros' después de 20 entradas
            if i == 19:
                tipo = 'otros'

# Función para procesar los números
def procesar_numeros(numeros_entrada, archivo):
    # Quitar el prefijo +57 y limpiar los números
    numeros = [num.replace('+57', '').strip() for num in numeros_entrada.split(',') if num.strip()]
    
    # Agregar los números al archivo
    agregar_numeros(numeros, archivo)
    
    # Mostrar resultados
    for numero in numeros:
        print(f"{numero} - Guardado")

# Lista de números a procesar (ejemplo)
numeros_a_procesar = '3118751768,3205667312,3118751768,3205667312,3118751768,3205667312,3118751768,3205667312,3118751768,3205667312,3118751768,3205667312,3118751768,3205667312,3118751768,3205667312,3118751768,3205667312,3118751768,3205667312,3118751768,3205667312'

# Archivo donde se guardan los contactos
archivo_contactos = 'contactos.csv'

# Procesar los números
procesar_numeros(numeros_a_procesar, archivo_contactos)

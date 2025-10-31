def process_elements_greater_than_B():
    """
    Функция для нахождения количества и произведения
    элементов массива, больших заданного числа B
    """
    # Ввод размера массива
    try:
        N = int(input("Введите размер массива N: "))
        if N < 0:
            print("Размер массива не может быть отрицательным!")
            return
    except ValueError:
        print("Ошибка: введите целое число для размера массива!")
        return

    # Ввод числа B
    try:
        B = float(input("Введите число B: "))
    except ValueError:
        print("Ошибка: введите число для B!")
        return

    # Ввод элементов массива
    A = []
    if N > 0:
        print(f"Введите {N} элементов массива:")
        for i in range(N):
            try:
                element = float(input(f"A[{i}] = "))
                A.append(element)
            except ValueError:
                print("Ошибка: введите число!")
                return
    else:
        print("Массив пустой.")
        A = []

    # Инициализация переменных
    product = 1  # Начальное значение для произведения
    count = 0
    found_elements = []  # Дополнительно сохраним найденные элементы

    # Основной алгоритм обработки массива
    for element in A:
        if element > B:
            product *= element
            count += 1
            found_elements.append(element)

    # Вывод результатов
    print("\n" + "="*50)
    print("Результаты обработки массива:")
    print(f"Исходный массив: {A}")
    print(f"Заданное число B: {B}")
    print(f"Найденные элементы > B: {found_elements}")

    if count > 0:
        print(f"Количество элементов > B: {count}")
        print(f"Произведение элементов > B: {product}")
    else:
        print("Элементов, больших B, не найдено!")
        print("Произведение не вычисляется.")


# Запуск программы
if __name__ == "__main__":
    process_elements_greater_than_B()

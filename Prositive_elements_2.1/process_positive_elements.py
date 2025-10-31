def process_positive_elements():
    """
    Функция для обработки массива и нахождения суммы
    и количества положительных элементов
    """
    # Ввод размера массива
    try:
        N = int(input("Введите размер массива N: "))
        if N <= 0:
            print("Размер массива должен быть положительным числом!")
            return
    except ValueError:
        print("Ошибка: введите целое число!")
        return

    # Ввод элементов массива
    A = []
    print(f"Введите {N} элементов массива:")
    for i in range(N):
        try:
            element = float(input(f"A[{i}] = "))
            A.append(element)
        except ValueError:
            print("Ошибка: введите число!")
            return

    # Инициализация переменных
    sum_positive = 0
    count_positive = 0

    # Основной алгоритм обработки массива
    for element in A:
        if element > 0:
            sum_positive += element
            count_positive += 1

    # Вывод результатов
    print("\nРезультаты:")
    print(f"Массив: {A}")
    print(f"Сумма положительных элементов: {sum_positive}")
    print(f"Количество положительных элементов: {count_positive}")


# Запуск программы
if __name__ == "__main__":
    process_positive_elements()

def has_pair(nums, target):

    left = 0
    right = len(nums) - 1

    while left < right:

        total = nums[left] + nums[right]

        if total == target:
            return True

        elif total < target:
            left += 1

        else:
            right -= 1

    return False

numbers = [1, 3, 5, 7, 9, 12]

print(has_pair(numbers, 10))

print(has_pair(numbers, 20))
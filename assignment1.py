password = input("Enter password: ")

valid = True

# Condition 1: length check
if len(password) < 8 or len(password) > 32:
    valid = False

# Condition 2: first character must be letter
elif not password[0].isalpha():
    valid = False

# Condition 3 and 4: forbidden characters and spaces
else:
    forbidden = ['/', '\\', '=', "'", '"', ' ']
    
    for ch in password:
        if ch in forbidden:
            valid = False
            break

print(valid)

# pylint: disable=C0103
'''
 mastermind
'''
import random

print("***** master mind *****")

# 正解作成
ans = ''.join(random.sample('123456789', 4))

while True:
    while True:
        val = input('--- Enter 4 digits(1-9) :')
        if val == '/answer':
            print(ans)
            continue
        if not val.isdecimal():
            print('It is not digits')
            continue
        if not len(val) == 4:
            print('It is not 4 digits')
            continue
        if '0' in val:
            # 0を含む場合
            print('Zero is out of range')
            continue
        break
    hit = 0
    blow = 0
    # 入力値文字列を頭から１文字ずつループ
    for i, v in enumerate(val):
        # 正解文字列を頭から１文字ずつループ
        for j, a in enumerate(ans):
            # 文字が一致するとき
            if v == a:
                # print(f'{i}:{v},{j}:{a}')
                # 場所も一致するならヒットを増やす
                if i == j:
                    hit += 1
                # そうでなければブローを増やす
                else:
                    blow += 1
    # 結果４ヒットなら正解とし終了
    if hit == 4:
        print(f'{val} is Correct answer! Congraturation!')
        break
    # 不正解ならヒットとブローを出力
    print(f'{val} : {hit} hit, {blow} blow. ')
# 終了
print('Thank you for playing, See you again!')

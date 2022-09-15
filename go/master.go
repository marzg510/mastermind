package main

import (
	"fmt"
	"math/rand"
	"strconv"
	"strings"
	"time"
)

func main() {
	fmt.Println("***** master mind Go *****")
	// 正解作成
	var nums = [...]int{1, 2, 3, 4, 5, 6, 7, 8, 9}
	rand.Seed(time.Now().UnixNano())
	rand.Shuffle(len(nums), func(i, j int) { nums[i], nums[j] = nums[j], nums[i] })
	ans := nums[:4]
	// 回答入力
	for {
		// 数値4文字の入力を待つ
		var digits int = 0
		var val string
		for digits == 0 {
			fmt.Print("--- Enter 4 digits(1-9) :")
			fmt.Scan(&val)
			var err error
			digits, err = strconv.Atoi(val)
			if val == "/answer" {
				fmt.Printf("answer: %d\n", ans)
				continue
			} else if len(val) != 4 {
				fmt.Println("It's not 4 digits")
				continue
			} else if err != nil {
				fmt.Println("It's not digits")
				continue
			} else if digits == 0 {
				fmt.Println("Zero is out of range")
				continue
			}
		}
		var (
			hit  int = 0
			blow int = 0
		)
		// 入力値文字列を頭から１文字ずつループ
		for i, v := range strings.Split(val, "") {
			// 正解文字列を頭から１文字ずつループ
			for j, a := range ans {
				// fmt.Printf("%d:%s , %d:%d\n", i, v, j, a)
				// 文字が一致するとき
				vv, _ := strconv.Atoi(v)
				if int(vv) == a {
					// 場所も一致するならヒットを増やす
					if i == j {
						hit++
					} else {
						// そうでなければブローを増やす
						blow++
					}
				}
			}
		}
		// 結果４ヒットなら正解とし終了
		if hit == 4 {
			fmt.Printf("%s is Correct answer! Congraturations!\n", val)
			break
		} else {
			// # 不正解ならヒットとブローを出力
			fmt.Printf("%s : %d hit, %d blow.\n", val, hit, blow)
		}
		// fmt.Println(ans)
	}
	fmt.Println("Thank you for playing, See you again!")
}

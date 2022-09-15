console.log('***** master mind js *****')

// 入力待ち関数
function readUserInput(question) {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve, reject) => {
        readline.question(question, (answer) => {
            resolve(answer);
            readline.close();
        });
    });

}
// メイン関数
(async function main() {
    // 正解作成
    const shuffle = ([...array]) => {
        for (let i = array.length - 1; i >= 0; i-- ) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    let ans = shuffle([1,2,3,4,5,6,7,8,9]).slice(0, 4);

    // 回答入力
    while (true) {
        // 数値4文字の入力を待つ
        let digits = 0;
        let val;
        while (true) {
            val = await readUserInput("--- Enter 4 digits(1-9) :");
            digits = Number(val);
			if (val == "/answer") {
                // 答えを表示する隠しコマンド
                console.log("answer: ", ans);
                continue;
            } else if (val.length != 4) {
                // 4文字ではない場合
                console.log("It's not 4 digits.");
                continue;
            } else if (isNaN(digits)) {
                // 数字ではない場合
                console.log("It's not digits.");
                continue;
			} else if (val.match(/0/)) {
                // 0を含む場合
				console.log("Zero is out of range");
				continue;
            }
            break;
        }
        let hit = 0;
        let blow = 0;
        // 入力値文字列を頭から１文字ずつループ
        val.split('').forEach((v, i) => {
            // 正解文字列を頭から１文字ずつループ
            ans.forEach((a, j) => {
                // console.log("%d:%s , %d:%d", i, v, j, a)
                // 文字が一致するとき
                if (v == a) {
                    // 場所も一致するならヒットを増やす
                    if (i == j) {
                        hit++;
                    } else {
                        // そうでなければブローを増やす
                        blow++;
                    }
                }
            });
        });
        // 結果４ヒットなら正解とし終了
        if (hit == 4) {
			console.log("%s is Correct answer! Congraturations!", val);
            break;
        } else {
            // 不正解ならヒットとブローを出力
			console.log("%s : %d hit, %d blow.", val, hit, blow);
        }
        // console.log(ans);
    }
    console.log("Thank you for playing, See you again!")
})();
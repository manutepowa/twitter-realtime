'use strict';

module.exports = function(hashtag, total) {
    var comodin;
    // console.log(total);

    hashtag.forEach(function(hashtagItem) {
        comodin = false;

        for (var i = 0; i <= total.length - 1; i++) {
            if (total[i].text == hashtagItem.text) {
                total[i].cantidad++;
                comodin = true;
                break;
            }
        }
        if (!comodin) {
            total.push({
                text: hashtagItem.text,
                cantidad: 1
            });
        }
    });

    return total;
}

<template>
    <div class="container wrap text-white">
        <h1>Ласкаво просимо на наш сайт про готелі!</h1>
        <p>Ми пропонуємо широкий вибір готелів для будь-якого смаку та бюджету. Насолоджуйтесь комфортом та розкошшю нашого відпочинку!</p>
        <img src="https://joinuplviv.com/wp-content/uploads/2018/03/reef-oasis-blue-bay-resort.jpg" alt="Зображення готелю">
        <h2>Готелі в усіх куточках світу</h2>
        <p>Ми пропонуємо готелі у багатьох областях України. Ви зможете знайти готелі на будь-який смак - від розкішних п'ятизіркових готелів до затишних сімейних готелів.</p>
        <img src="https://ostriv.org/wp-content/uploads/2019/03/DSCN1554-1-%E2%80%94-%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F-e1566499989226.jpg" alt="Зображення місцевої визначної пам'ятки">
        <h2>Відвідайте місцеві визначні пам'ятки</h2>
        <p>Поруч з нашими готелями розташовані найкращі туристичні місця. Ви можете насолоджуватись красою місцевих визначних пам'яток, проводити час на пляжі, екскурсіях, ресторанах та кафе.</p>
        <img src="https://otpusktime.com/wp-content/uploads/2021/10/vorontsovskiy-dvorec.jpg" alt="Зображення місцевої визначної пам'ятки">
        <button class="d-block" style="margin: 25px auto 25px auto"><router-link to="/hotels" class="nav-link px-2 text-white">Обрати готель</router-link></button>
    </div>
</template>
<script setup>
</script>

<style scoped>
h1,h2 {
    margin: 25px;
}

p {
    margin: 20px 0;
}

img {
    border-radius: 15px;
}
.wrap {
    margin: 0 auto;
    margin-top: 25px;
    text-align: center;
}

button {
    background-color: crimson;
    width: 200px;
    height: 50px;
    border-radius: 12px;
}
</style>
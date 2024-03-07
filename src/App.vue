<template>
  <div id="cont">
    <h1>Рассчитайте своего клиента:</h1>
    <calc-from></calc-from>
    <result></result>
  </div>
</template>

<script setup></script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&family=Montserrat+Alternates:ital,wght@0,400;0,700&display=swap');
body {
  @apply h-fit bg-[#272829];
  overflow-x: clip;
  margin: 0;
  padding: 0;
}
#cont {
  font-family: 'Exo 2', sans-serif;
  @apply flex flex-col justify-between items-center h-[100vh] w-[100vw] text-center text-[#D8D9DA] py-5;
  overflow-x: clip;
}
h1 {
  @apply text-4xl font-medium w-[80%] mb-16;
}
.altText {
  font-family: 'Montserrat Alternates', sans-serif;
  font-weight: 400;
}
</style>

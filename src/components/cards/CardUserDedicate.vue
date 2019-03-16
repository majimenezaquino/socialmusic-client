<template>
<article 
:class="{ 'user-dedicate': true, 'user_dedicate_select': active }"
>
    
    <div class="thumbnail">
    <a href="" v-on:click.prevent="selectUserDedicate">
        <img :src="img" alt="">
    </a>
    </div>
    <div class="info">
            <a href="" v-on:click.prevent="selectUserDedicate"><h1>Miguel Jimenez</h1></a>
    </div>
    <a href="" class="close-user"><i class="fa fa-times" aria-hidden="true"></i></a>
    </article>
</template>
<script>
export default {
name: 'user-dedicate',
data(){
    return{
        class_active: '',
        active: false,
        img: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgICwkICAgKCgkIBwoHBwYGBw8ICQgWIB0iIiAdHx8kHCggJBolGx8fITEhJSkrLi4uIx8zODMsNygtLisBCgoKDg0OFw8PDzcZFRkrKysrKzc3Ky0rKzcrNzcrNys3LS0rLS03Nys3NzctKy0rKy0rKzcrKysrKy0rLSstN//AABEIAMgAyAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAAMEBgcCAQj/xABDEAACAQMCAgcDCgUDAQkAAAABAgMABBIFESEiBhMxMkFCUVJhcQcUI2JygZGhscEzQ5LR8FOComMVFiQ0RMLh4vH/xAAZAQADAQEBAAAAAAAAAAAAAAACAwQBAAX/xAAqEQACAgICAgEDAwUBAAAAAAAAAQIRAyESMQQiQRNRYTJxgTM0QrHBI//aAAwDAQACEQMRAD8A04PidjxFPFt1OPZSFtvXjIY/hU0ccoy30FyTWji2h5y/rRFUFR7XY8al1YtLQl7ZHlIFQZZN2AAqZceNDZzsd6bEWyaJAF2NMOykE02CzComo6paWCbzOMv9Je9WNqO2FGLlpAzU8mcYg96pNrqEFvsJZVX6uXNVR1jpO85ZLdAileVssWaqvPqEgOTsf9rZfrSZZ7fqPjgpbNiXpLpw5Q7s3/TSuz0p0tBk8rAfVTKsWfVLhypRjkG5WVu9TDalPG27t3lxfmrPqfc540fQFjrWm3uwt7uNmP8ALZsW/A0RXbwr5ubUmUtg5HmyVvHwqw6B0/1bTiqSubq3HK0E7/SKPca3kmY4fY3E1yw3oP0d6SWGuRdbaSc45ZbaTlkjNGd60XRCeMZHhTiLt2V24416BR2COLXVcivaAJHhpEUjXhNajmcbVAviSDtU9+FRGTKiatGJ0yDHbg9tKpuGO9KujFJG8iYOFcTICKTuBXSsGG1Y0YmMW/KSKmb0wqbHcU7vtXUdZGnPbQ66x8eFTbptqD6ncrAjSE8QvLR3xVsxLk6Iut60lhFhFs0rd1v9P31mmtalJLIcnZnk5u9y110g1OV3bAkyStivN3RVbuH2G4bJz35PMx8ailJzdvoujFY40ux6S54nZsm80nlWuOteflBI2/mN3aYs4Wn3HYuWLfvU6QJbLuuxI83lWubS0jkm9vo8Z0tEKuSXZeZV5W+/0HuqNDJHMdjGSo7y97hXFvaXGoSYxhiC3NJV30DoiIxlKvFl5sqXLIo99jI4nLfwUaXeFgD2+WkXZ/PsRzd6tC1PoZFJu6sQccVxqlaz0e1Cw3kQF4x3uStjmi9GTwSW0OaNqlxYTJdWkrRzRtzNG3LIPQ1ufRLpFDrdsH4R3MfLc22XdPqPdXzpaXalsJMVbLFm7tWzovq8umXUM0b8hbF/ZYeP40+MqdE8oWjeyPE15vUS0vUuYo5kbdWVWVq7aUCnpEzJimvajJKPWn1fesaNTPTS2pUiaE5nLcaZK7U6TXDUaMYxN2GlSm7DSojCJJcgjtp+2nB7TVXW9PYWqdb3oG3GkQyKTDcaRZVkHrXLSD1oSl5w7a9+db8d6Y2gVY7eTAbmqX0mvmcGNTsoyZ5PhR+/udgdjxqi6/MWDoCRk/U8vp4/576nzZNUirBDdlW1GRz9IT/Eyx+qtB1VpnVI+Jy6tfrUR1d8M2YgLjjj7h2fnXOhRIAbh+0Lin7n40pSqNj5Q5SoIJGluohj2JHfkbzHx4+goRd3AupVjiH0YbFf+ofWn9WucR1UfBpP+K01odv1kq7cQrLQLScmHVyUUaB0W06KGNGKDiuXdq2oVAGwoPpVsQibcAFouqECprsspI6yBG1Qr6OKRGV1B3qSB4GvJYAQSayzqMU6W6YlrdM0QCLI2S+zTOkXMgbqZTwPckx7tWb5RLFhjMo5Q2LctUuLcFXBIZebL2qtxS5QIM0ano2zoDq7tE9pK27Q9z7JqzzXOPjWUdENRVZI332P8F8av5nzUcd/LlVEMmqZLmx07QYivgTtvRG3uAduNVNJSD20TtLrsG9MUxPEsqyb16W3ofDPvtxqWj70WjByuWr3evCa04jzeNKvJT2ilWnUZ8zncVLgduHGoB33qZbcdqjjEY2EI2c+NSVYgdtMRDsp7sFFRiIWoSBQWPgtUvVixlRN+AXrHb86t1+25xPZ3m+FUrUpSTczg+bq0X9amm7kXYo1EqWvShpAgO/MuX61ODC2gjU96Rcm/wA/ztoPdAyXMSbcHdVojft1jlAeSLGPFfNXSXSCi+2D53zYt3i/dqzdEooY/pJnVF7zMzVX4Yc3CDix/wCNWm1eHSoDIsQklP8AMkXLGhyStcUOwwr2ZbE6S6dbjHeQgebCnYuldhNyoz7/AFlqgX2o3c4V/m8hWVMkk5VX8BU/Qraclkmg3YMuTY90fHxpTg0rHRkm6RoK3aFesDcooDqnS4QkxW8LSP3cqO21iGtXxHk7tUXVNLvZnZFXq48GZZI8e330EFb2bLp0cazeXuoW8wme3AwyWDLKT9ao1puQS3aMqOX2iajFtKZCQMcsnZvj20HhXYzJts65ZVXjqN0yPIm6tBPo7cmGZVJ5WbHvePhWo2E2aLx7VrHrRtiDvx9r31pfRy96+GNt92GOVEnUhc43APg7mpEbEbGo6nbjXudUcSMM21z2caIwT77car8TkbUQt5TRLRgcWT30mkHrQxbjbxrsz7+NHZlD8j770qiFyaVbZ1FHeQA0QtW3xNB2O57fNRmyA2WkxRoTh9a7du30pRgAUxK3e/4rRS6NitgnVp8Ekcexiv51Rr2Q9WoPHrGkkq0dIZMkjQHiWaRvhVO1SUBsRwWNOr+1xqFbkehHUQGu4uYXPdVcvw3py+uupXbgZG5sf9OvOBIfgFj5mZl7o23qBcbyFn48W83pTOPJ7A5UtB7o7AZ5E34k1odrpiFVUoG5ebJcqz7oZJ9KAfCtY09lIB341JktSovxU4JkM6KW2GCqv1Vqfb6ZHCOPE+zRBXQDcmoct+rOFGyx5c0rd2sbpBUwjZx7Ky7cDQ6WyhclJEG4bvUrXXbJi8MM0crx95Y5VbGot5qSSM7QEiWNVZlx5W91ZaSM4uzm+0mDq35SeWsg12NbG/KkbJKrK1bFHqSzxcdt8eZayH5QnU34VduWLJvvNNw+0qF+R6wtg/jGSO1S2WVWjolfdW/Vsd1/aqjbyJMoRzi2PLJ7XxolpcklrKA5G47vN3qdNUSxaZrUTlhwO9dgHhwodolysqKVO4K8tGEUnjVWKXKJHlhxkSIU32qfEm1N2sfAVPRKbxE8hjA711jtTpTausN65o1MaApU6U2pVwRns9tJG25XhRaxG4UCpVzb5eUn/bXttAV25D/TWIwlop2qJc7jInh7NEI4ZD2I39NDtWDIr8CN+Whm/UPH+oqusyY5uOIwXH9qqOpMR1pB4Roq1ZtcYs0aDsy658fKAKrN8Sy8e2V+uby1DF7L2tAx1JSQb7kqq81NmEYcBx5l/Sn5Rsh34MzZNUu4h6uEvt2/vt/ajcqBUbGejDYz4jtyrTdPuSoXesr0VxDdRFvHvffWpWaq6K49mpfIW7K/GfrQRnuWICqe9y5ezXSLbpHtJIqhv9Ru9XiIrqQO3HGgr6RPBPJLLKLuGTLCO5fqup4j09ONKgrex926H7kWZYFJUUj+ZjXhv7C3U7uNvM1SMISMRp0H8Xrcs1/tULUIfnLCJ44I4pGXK2gXJpOO/E+lN4L5Npv4Z6MZN5oG+jkXLJfN2cfzrK+ljmS+mYnfmVfyrXb8pDDiqhd1xVV8orGdXmE11cuDuOtbFvhwpnjL2bI/MlcUiPANtyPJRmBOvQIOEi9z63uoZBGwAk24ZqrUWRHi504EYyKrf58aom7JcapFj6Kak8MqwTArk2OTd1vfWjQjfY7VkDwzGe1a0Vt7qVZEjj8p34j8T+dfQWlWyLDEHVS4iXOiwvixedWQbRTw4GiCqduw0QSNB2KBTgKDwFV/URJwYKZH9k/016Ek27jf00W3T3V5mg9KFzQSgCTFIfI39NKivWJ6ilQ8guIMaOMHgBTDCMHsHBqFPNcDxavVeU7b70NM20HVZAPCq1r8qsQiHfFGkfGn57h41O5I5fa8Kq+p3U0+1rbkdbPlmzd2MeppWVtKhuKNuwDfyCSQPwICSLy/eKAXDiR2eRSEHdVW8PCj2qWzWyYodmCYvPO2OJJ4mgUzxRqFjOckmLNIyd302H+fdUy1ose1ZAkVpGWPE5M6qkbe+ieskAJCPFpPwHAfvXejafI8hupRtsrNF1jd3wyNM6iuUjP2DLq4l91byt0co6sAZMjBx3l5q0LoxrCXEaozbMF5lyqgzpxkPhlTtg8tuwkiYqa7LFSibik4s2SzYb9vA1NMAkBHrWf6V0kdQEmUgjzLVmstfgfbdwDUdNPZX3tE9tFjc77Bfs8tdppkUG7DbfzNXg1iMji60L1fpNawI2zh28scfMzUSdmtyrbA/TjVksoHKsBIU6mBfefH7qygA94+NEdf1KfUbl5JjwDYxR+WMVGwAUn7K1dihxj+WeZmnzl+EFViHzPrOG/77GiFmBKoRxvyrzflUC0frbKRPGJ1yX3f4alaZMFxftCti+XpWP5CVaLp0H0vKRJZU3Nu7NAze/t2/CtMWWSNRjuRlVG6L3CKAEblGWFXe1uBIArbA+blooMVlTsdaaQ8yk7eauGnkAyLGpCqvZ2mhms3SQRuxO2y05SQjiyQt8Tvu/8AyoDrXSD5oRzn7OVVK/6TmBzix38q5VW9Q1d7ti7MSTQW2xvFJGhWvSxJODSEfaalWZx3BHmpV1s3gjeWjQ+leBEHpQp7mUEjYmuGvZANyDRbF+p7r8ixwsdwDIyr9wqsaTKHluXcBJC7Yr7IHAfpUrWrxpjFDudjzNjQUs8ckrjhk0i5ezvtU2WbUirHBOIP6RymbMR74B+Vm5l2B7aF6TZddIZrnLq1ZsVbvN/+0av4wUZV7PMzeYVEstmVRwUM7ZfVUUq9D66Jt3OscXKAoZcVij8o8BVYvpiGxU7kZMze+ierXOUkmB2WNljiVvXj+lBmUHfc7hfNRwVGTd6IsxxUrw3LZUQsUEgA7aESOJGLb8o5V+tRbSG2x3opr1Axv2CsdsBsdqIW9upFdqisoO1S4kAWpJMtigZdQgco3oXqKCND7lo/ImTbgdlANdkUcg73m+rRQ26BnpWVOVSzt6ipEgAjU/8AVyryUAScoP2varqXc4pw+zljVt9Hn12xzS5hG5VjtHMnVvl5T4GpELGKR4jwy7q1Djg3GB5XPtU64kOwlQh17smPLJQt2wo6RYLLUr60KPau3exeFlyX8Ksth0z1OIZXmmtJGP8A1MCtj99Uqxut9gx2Ye15hR20up4+eCZ1PmVWoOVPYfBSWi+6R0xtbshAzRueXq5GyxNA+nGsuMY0bg7eWq2X/wDELdu4WQMrMy4rlt61F1jUTcyKXx9nl5sabBqXQiceLIUmU5yJrpLBm2xPGvQjACRDuO8y/wBqKaKDMwyFFLSsLGlJ0wZNptygyVdx9WlV/jsoyoBApUn6jH/QiSf+8hjLboCMvZrmTWZLsbAooHs1XHG5IPD61SLNcNuG5PdZuXGvRdHlKyeymSWEMe1Gb9a4vgoGyqBs3m7tSlUDq5pWIMcTc1DbyXrSG7EC5KrV5OR3Jnq416oF3swjVgWy5eZvaoN8/wAUATfIty1K1lzxA7fZWq9IxDBdjucmWjjG0dOVMn3VwMwCd1PMuP61Cu5DsUTunvMvmryEPKrcNsGxWVvLvXTJ1auMSdmyZmokqBbsgnk4ntPKq0W0V+s7O8vl91CnRnILHj5frVK0OYw3aI+4WVupZW8p8Pzo5xuLFwlUkXvTwXXEiprRkbDalplvt2iibQL4ioWeimBpFwVmql6kXkeUEblm5av99EMSBWfapI5mkCAYRsy0eNbF5H6kVbSQMZp0McapkzMv5CochLOwXf2qLWuqIVFteozI3Lkvl+Ndy6bLaH5xCyz2pZWRu9iPAGqeTXZJxT6IMMbFMWjZXC/xmTlqRZs4+juOMZbFJPMtHdN1e1KhJYY2UcrKy939xXGo29s4aW2JKFuaFl+kjPp76V9TdNUM+n8p2Abi3eOQSQqdssW+rUuC7LKzKSGjx5l5cjT6qzg9WVf2o5F73CocyooaJBi5ZZH+rRp2DXE4UsCzsxYluX61RppH3LKDue8y8y17ciVQBiVjxVeZeVqjMexuO/tLVGONKybJK3Ra+jcUV9AyO5EkL/lUtzHp7bodv91VjTL6W1MjxkljFji3mpm51Oa5Kl2/20xq1QCk4u0XqLXQcdjSqo2ruQGXwpUr6UR8c8qLj1ZB4rv9rurUuCZV5GIyjxbFl5V3HZRK501rcvI6jaNWkxqtSybwySZ7tIzSP8aPNOlSE4IJu2S9U1D6Tq9lKYqv2jQ67vNncFgBHjj8aC3968iROGPWW7tkq/zF/uBULVLxmDSBu9i3L8Kj4O0XKa2O398jE5MOHmpnRrG41CbNHZYlbmk5saHWkTXUqox2jHM7e6rTHeJaxrDCuIRe6v6mmSfFUuxUVzdvoeuraztRirFivtNisf8Ac0FnkSXlRNwOZV9/wru4eR+LAkt3cqHtO8EpZCNwve8vvoYxf8hzkv4OZonQdYxyB/qU03K++LgYyRsvMvl9KkC4NzHcKyAFYsmZV5d9+FDZHI5D4tT429Mmm0tro2Xo/Il3a290m30sSsy+yfEfjRR4SaqHyX3vW289ozbtbT9Yi/Vb/wCQfxq+BAahyQ4yaL8c+UUwNdW59N6pesaYYGmkVVxkbrFkZeVT6GtJliB34VVOmaJFZXMg4HqmX8eH71kLugpNcW2VGNbWRcLq3jyC8s8cq/tXRb5qkhgkEkTtz20jZcPGqoCQalW0jqerDErLy4/2qx4mvkhjmT+CVMNnYq2zq2SSL/MHhT0Ny4YLxAblZcv87KbFvIZuI4KuLfhTtlamefFDuIYmyby8BS5JVsbFscSfcsitzhsscsa92ErLt/Ex5mauLOLrJXLOqAtytj3qkX6LmsUHA3DxwoytzcTWqO0karkRHVyZFdFeJMW6xfL7zXmu6f8ANGhkR+sgu7b5zbSLl2enHxFEJtMurMvDJKix3EDZyy8qttx2P37U7rSiTRtKcoQ8FzcQda3dYHc7A/hVsIOMXZ2TDSkmtpWVuFieI7aanXF8R2Du/rXsTFRwp4x9YFcAkhcWxoSFoO9HIROACNyKVO9D1frsMSFP1aVTzbstxVxRsvS+xeLT9SnXvx2cip8SNh+ZrJoiTbor8Mouf6x41tPyj7jQtTZeDdRHi2WPnWsKN4oSNWbchZOv6xcuBP6dlMyp0TYXTBd/Eyyuu2xkbKJl8wqPdW+8CyAtv1rRtzcvDb+9HTCJCigB925JMcsd/GmnSMh4AQFjlVmXH0oIyTVfJXjxqTp/IGsUKqEU7FnVmbzURWzkkZHyKR/Wrw2YV3UjFeVlxbmX+1PS3rx7gnYDvKvLw99Km3Zyhx9X8HL2yd0yOZAvKsrLGslDJoGeQLwQeZpPL61MD2sxLiQbjys3dqHqLNIAYyWGXlrYN2BNKrFc3ltDGLa2XMHmlnbly29KFSncltzx5u7XrK42DKQfZZa9Zdx8KpjFIknJstHycXvzbU44ydku4mgb49o/Tb762RFr590q5NrcW1yp4wXMcv4GvoWBgUVgdwVyVql8mNNMr8WWmjl04VQflNn6u1jgHbc3OLfAcf12rQpG4VlPyoXGd3a24O/VWzTN8WP/ANaXhjc0NzSqDKORTsM5QoNttmyyXvVyRXmNeg1ao81OnaJ1xfqoKIp5uZmy5mqXa3EkdszxRneflefLlj93xoKRVm6EQvcy3Vrm2LW3XdX5W2IH70Cwp6RV48nPIov5BFlckuFG+RZV5aIX0KCYdXI5aFFZlwbJjw4e7x4+6lpcMUGsRxtliL5oWjaLHj2Dh8aP9LrYxT289v1atdQNG6SQI2QG3EEjh2ns28Kbjw1srjD0k/sydrdld3ttPcx26NHCsc9tLG/0ka7bsR+dVi/kA0oRl8gNUXCP/TGHge3Y1etLv4f+zHCu0pjtfmj9V/EZgNiNvAdn41m19IyWMMTMCZbqSTFu9GAANqfkpb+4zyHpy+6BC8KL6M8azQCT+G0vVvl6GhAqVEdgu3blUzVqjyU6dmvaZpUFuQ4QA0qgdH9ZS6toWZ/pI0WKVfeKVQSk0z0Y01Zeflcuuo0O4jG291c28HN8cv8A2189yzuuwyJx7vN+Na78tV+epsbTLhJPJcsvwGw/U1j0nHtq67PNWkG9Abrobty7K9mizxdW2OQB41PM8RUvJaq8h5utgbq2YVXtDuhbztG65RXcTWkq/a4D89qL6CzzTG13VlZJGaNu9GRQZMV1x7L8MlJRS76OJb5nbbqwqHFurZe98ah6vI9wJJkTkj5nkblaQk0tXv1R3hSLEBuWTLvUxPqKy2wgxVTji2P+dtLjjp3IOTinKMntf7IKbgDGTiKblmdeXMk+bFqkaRbfOrq2tmyKzTrG3V96udUtDa3M0B3+jfly9DxH605Y9WyOSlw5Lq6IxYnbfc/WavVFICvQKIms8RdtxW89FLv51plhOTuxtY43+K8D+YrCDwIPrWpfJXqQmtrjTnbntn6+BfaQ9v4H9aR5Mbja+CjxpVKn8l0mmAB41ifTC8+d6neSb7rHL82T4Lw/UGtS1a9+bvsx4BJJvuUb1iru0jNI53Z2aRm9omleKrbY7ynUVEVe14KW9WkQiKtHydiQ6iyxMATZzZZLlw3FVberV8m7barGPFrWZVX7qZj/AFId4zrLF/kXSFJLTVJCXAL3Mc7TwebxHwPb2VZuniRnTrWXNf4sKp1n8RgVPZ+O5+FBenliqX0SqzY/NY1eefLq99z41ZdasYptHLQhX2sYZkaR8stgDwNPSfsj04pt5IkXovcRx6LO2OzwvcNI2XeOO/8Ab8KzbU3XG2QMWIg6x8lx4sSf02qy6bfvDpmoqv8AMlW2iXHLq9xtx+4mqhfOpmkwGyBsVXLLGkZJWkT+TJfSivwcoako3YPSoqEHxp3fEZeX2qUQBbSL820uCt/ExyWlQZGKv1njlSpUoW7GRy0qNM+V+763UIIAf/LWK5fEkn9Nqzx6VKjh0ha6GW3GxHaKO9HL+KKY3Fyf5UiyyRtizbj08TSpUcex2GTjNUQ9X1CS9cqsaRQI2UVtEnKvxPiaZtLdZMY4lMlzM7QrEy4rHv2Hc+Pb8KVKi7Z1uc3KW2F+ha4XxQKpcxNGrZL6jfY/2rnp1bdTqDEdkttHJ+37UqVH/gUP+0/kr21KlSpR5wjxBFF+iWrnSr+2uiSIw/U3S+0h4H8O37qVKskk4mxbTRf+njrHG0qNurWd0qMvm3Q1lCmlSqbxumVeX3H9j0mvCaVKqiQ8Bqz/ACfRyPqkBRygjimklkXHlXb3/dSpUyH6kOwf1I/uGOm1w5ntbpzGrNBcQxcmUc6g+I8O07ftVismS70Jdyjj5hJGyq3Lw3G35UqVPX6mevF/+0/2Kdp+D6NeMmxkj1GOeWLzMox/LjXGm9GLW8hR2zzkXrGkV/WlSrz/ACpOKjQnipKNr4/6E9O+T+1Lh5p5XjH8pcVy++pPTzR7az0mNLSBIo7e8jkZY1724I4nx7RSpVJHJJyVsVPHFRdIzYilSpVcec+z/9k='
    }
},
methods:{
    selectUserDedicate(ev){
        this.active!=this.active;
    }
}
    
}
</script>
<style>
        .user-dedicate{
        display: flex;
        position: relative;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 10px;
        border: #eee solid 1px;
        border-radius: 5px;
    }
     .user-dedicate:hover{
         background: #eee;
     }
     .user-dedicate .thumbnail{
         margin: 5px;
         border: none;
         width: 40px;
         height: 40px;
         padding: 0px;
         position: relative;
         border-radius: 50%;
         background-size: cover;
         border: #eee 3px solid;
         display: flex;
         justify-content: center;
         align-items: center;
         overflow: hidden;
     }
     
      .user-dedicate .close-user{
          display: flex;
          position: absolute;
          justify-content: center;
          align-items: center;
        right: 20px;
        width: 25px;
        height: 25px;
        border-radius: 50%;
      }
      .user-dedicate:hover .close-user{
          background: #ccc;
         
      }
      .user-dedicate h1{
          display: flex;
          font-size: 15px;
          color: #444;
      }
      .user_dedicate_select{
          background: rgb(33, 150, 243) !important;
      }
</style>
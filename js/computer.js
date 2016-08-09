/**
 * Created by novax_000 on 2016/4/8.
 */

window.onload = function () {

    initial();
}


function initial()
{

    var person = document.getElementById("person");
    var computer = document.getElementById("computer");

    var person_score = document.getElementById("person_score");
    var computer_score=document.getElementById("computer_score");

    var person_hit = document.createElement("button");

    person_hit.innerHTML="Hit";

    person_hit.id="person_hit";

    person_hit.className="btn btn-success";

    person.appendChild(person_hit);


    //初始化，user发牌两张，电脑发牌两张，一张只显示背面
    var person_card1 = deal();
    var person_card2 = deal();
    setCard(person_card1);
    setCard(person_card2);
    var person_Array = [person_card1,person_card2];

    var computer_card1=deal();
    setInitialComputerCard(computer_card1);
    var computer_card2 = deal();
    setBackCard();
    var computer_Array=[computer_card1,computer_card2];

    setScore(person_Array,computer_Array);
    addEvent(person_Array,computer_Array);


}
//设置卡牌背景
function setBackCard()
{
    var display = document.getElementById("computer_display");
    var div = document.createElement("div");
    div.className="backCard";
    display.appendChild(div);
}
//初始化电脑牌组显示效果
function setInitialComputerCard(dealCard)
{
    var display = document.getElementById("computer_display");
    var div = document.createElement("div");
    if(dealCard.getSuit()==1)
    {
        div.className="card suithearts";
    }else if(dealCard.getSuit()==2)
    {
        div.className="card suitdiamonds";
    }else if(dealCard.getSuit()==3)
    {
        div.className="card suitspades";
    }else if(dealCard.getSuit()==4)
    {
        div.className="card suitclubs";
    }

    var p = document.createElement("p");
    //var p_number = document.createElement("p");
    if(dealCard.getNumber()==11)
    {
        p.innerHTML="J";
    }else if(dealCard.getNumber()==12)
    {
        p.innerHTML="Q";
    }else if(dealCard.getNumber()==13)
    {
        p.innerHTML="K";
    }else if(dealCard.getNumber()==1)
    {
        p.innerHTML="A";
    }else
    {
        p.innerHTML=dealCard.getNumber();
    }

    div.appendChild(p);
    display.appendChild(div);
}
//将电脑所有牌翻出来显示
function showAllCard(computerArray)
{
    var node=document.getElementById("computer_display");
    while(node.firstChild)
    {node.removeChild(node.firstChild);}
    for(var i=0;i<computerArray.length;i++)
    {
        setInitialComputerCard(computerArray[i]);
    }

}
//抓牌事件
function btnEvent(personArray,computerArray)
{
    var isDraw=true;
    var cardArray=personArray;

    if (getScore(cardArray) >= 21) {
        isDraw = false;
    }
    if (isDraw) {
        cardArray = draw(cardArray);
        setCard(cardArray[cardArray.length-1]);
        setScore(cardArray,computerArray);
    }else{
        removePerson();
        compare(getScore(personArray),computer(computerArray));
    }

    //for (var i = 0; i < cardArray.length; i++) {
    //    console.log("I have " + cardArray[i].getSuit() + " of " + cardArray[i].getNumber());
    //}

}
//给按钮添加事件
function addEvent(person_Array,computer_Array)
{

    var person_hit = document.getElementById("person_hit");

    var btn_restart = document.getElementById("btn_restart");

    var person_stand = document.getElementById("person_stand");

    if(person_hit)
    {person_hit.addEventListener("click",function(){
        btnEvent(person_Array,computer_Array);
    })}

    btn_restart.addEventListener("click",function(){

        window.location.reload();
    });

    person_stand.addEventListener("click",function(){
        removePerson();
        computer(computer_Array);
        compare();
    });

}
//比较双方分数
function compare(){
    var personScore=document.getElementById("person_score").innerHTML;
    var computerScore=document.getElementById("computer_score").innerHTML;
    var p=personScore.match(/\d+/g);
    var c = computerScore.match(/\d+/g);
    var result = document.getElementById("result");
    result.className="tile result";
    if(c>21||p>c)
    {
        result.innerHTML="你赢了";
    }else if(p<c)
    {
        result.innerHTML="你输了";
    }else{
        result.innerHTML="平局";
    }

}
//定义扑克牌类,第一个参数为花色，第二个参数为牌面数字
function card(s,n)
{
    var suit = s;
    var number = n;
    this.getSuit = function()
    {
        return suit;
    }
    this.getNumber = function()
    {
        return number;
    }
    this.score  = function()
    {
        if(n>10)
        {
            return 10;
        }else if(n==1)
        {
            return 11;
        }else
        {
            return n;
        }
    }
}
////定义完整的扑克牌数组
//function realCard()
//{
//    var suitArray = new Array(4);
//    for(var i=0;i<suitArray.length;i++) {
//        suitArray[i] = new Array(13);
//        for (var j = 0; j < 13; j++) {
//            suitArray[i][j] = j + 1;
//        }
//    }
//    this.getRealCardArray = function()
//    {
//        return suitArray;
//    }
//}
//摸过的牌就从牌组里删除，避免重复摸
//function test(card)
//{
//    var real = new realCard().getRealCardArray();
//    var card = card;
//    console.log(card.getSuit()+" "+card.getNumber());
//
//    for(var i=0;i<real.length;i++)
//    {
//        for(var j=0;j<real[i].length;j++)
//        {
//            if(i==card.getSuit()-1&&j==card.getNumber()-1)
//            {
//                real[i].splice(j,1);
//            }
//            console.log(real[i][j]);
//        }
//    }
//    return real;
//
//}
//test();


//生成牌的样式
function setCard(dealCard)
{
    var display = document.getElementById("person_display");
    var div = document.createElement("div");
    if(dealCard.getSuit()==1)
    {
        div.className="card suithearts";
    }else if(dealCard.getSuit()==2)
    {
        div.className="card suitdiamonds";
    }else if(dealCard.getSuit()==3)
    {
        div.className="card suitspades";
    }else if(dealCard.getSuit()==4)
    {
        div.className="card suitclubs";
    }

    var p = document.createElement("p");
    //var p_number = document.createElement("p");
    if(dealCard.getNumber()==11)
    {
        p.innerHTML="J";
    }else if(dealCard.getNumber()==12)
    {
        p.innerHTML="Q";
    }else if(dealCard.getNumber()==13)
    {
        p.innerHTML="K";
    }else if(dealCard.getNumber()==1)
    {
        p.innerHTML="A";
    }else
    {
        p.innerHTML=dealCard.getNumber();
    }

    div.appendChild(p);
    display.appendChild(div);
}
//生成随机牌
function random()
{
    var suit=Math.floor(Math.random()*4+1);
    var number=Math.floor(Math.random()*13+1);
    var dealCard = new card(suit,number);
    return dealCard;
}
//发牌
function deal()
{

    var dealCard=random();
    var suit = dealCard.getSuit();
    var number=dealCard.getNumber();
    return dealCard;
}
//显示得分
function setScore(personArray,computerArray)
{

        var score=getScore(personArray);

       var show_score = document.getElementById("person_score");

    show_score.innerHTML = "你的得分为: " + score;
    if(score>21)
    {
        removePerson();
        showAllCard(computerArray);
        var result = document.getElementById("result");
        result.className="tile result";
        result.innerHTML="你输了";
    }
    if(score==21)
    {
        removePerson();
        showAllCard(computerArray);
        compare();
    }



}
//游戏结束移除hit和stand按钮
function removePerson()
{
    var person_hit = document.getElementById("person_hit");

    var person_stand = document.getElementById("person_stand");

    if(person_hit)
    {
        person_hit.parentNode.removeChild(person_hit);
    }

    if(person_stand)
    {
        person_stand.parentNode.removeChild(person_stand);
    }
}


//计算得分
function getScore(cardArray) {
    var sum = 0;
    for (var i = 0; i < cardArray.length; i++) {
        sum += cardArray[i].score();
    }
    return sum;
}

//摸牌
function draw(cardArray)
{
    cardArray.push(deal());

    return cardArray;
}

//电脑行为
function computer(computerCardArray)
{

    var score_computer=document.getElementById("computer_score");
    var sum=getScore(computerCardArray);
    while(sum<17)
    {
        computerCardArray=draw(computerCardArray);
        sum=getScore(computerCardArray);
    }
    showAllCard(computerCardArray);
    score_computer.innerHTML="电脑的分数为： "+sum;
    return sum;
}




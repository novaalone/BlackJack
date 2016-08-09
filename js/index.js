/**
 * Created by novax_000 on 2016/4/7.
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
    var computer_hit = document.createElement("button");

    person_hit.innerHTML="Hit";
    computer_hit.innerHTML="Hit";

    person_hit.id="person_hit";
    computer_hit.id="computer_hit";

    person_hit.className="btn btn-success";
    computer_hit.className="btn btn-success";

    person.appendChild(person_hit);
    computer.appendChild(computer_hit);


    var person_card1 = deal();
    var person_card2 = deal();
    setCard(person_card1,1);
    setCard(person_card2,1);
    var person_Array = [person_card1,person_card2];

    var computer_card1=deal();
    var computer_card2 = deal();
    setCard(computer_card1,2);
    setCard(computer_card2,2);
    var computer_Array=[computer_card1,computer_card2];

    setScore(getScore(person_Array),1);
    setScore(getScore(computer_Array),2);

    addEvent(person_Array,computer_Array);

}

function btnEvent(object,personArray,computerArray)
{
    var isDraw=true;
    var cardArray;
    if(object==1)
    {
        cardArray=personArray;
    }else if(object==2)
    {
        cardArray=computerArray;
    }
    if (getScore(cardArray) >= 21) {
        isDraw = false;
    }
    if (isDraw) {
        cardArray = draw(cardArray);
        setCard(cardArray[cardArray.length-1],object);
        setScore(getScore(cardArray),object);
    }

    for (var i = 0; i < cardArray.length; i++) {
        console.log("I have " + cardArray[i].getSuit() + " of " + cardArray[i].getNumber());
    }

}
function addEvent(person_Array,computer_Array)
{

    var person_hit = document.getElementById("person_hit");
    var computer_hit=document.getElementById("computer_hit");

    var btn_restart = document.getElementById("btn_restart");

    var person_stand = document.getElementById("person_stand");
    var computer_stand = document.getElementById("computer_stand");

    if(person_hit)
    {person_hit.addEventListener("click",function(){
        btnEvent(1,person_Array,computer_Array);
    })}

    btn_restart.addEventListener("click",function(){

      window.location.reload();
    });

    person_stand.addEventListener("click",function(){
       removePerson();
        wait();


    });

    if(computer_hit)
    {
        computer_hit.addEventListener("click",function(){
            btnEvent(2,person_Array,computer_Array);
        });
    }
    computer_stand.addEventListener("click",function(){
        removeComputer();
        wait();
    })
}

function wait()
{
    var computer_hit=document.getElementById("computer_hit");
    var person_hit = document.getElementById("person_hit");
    if((!computer_hit)&&(!person_hit))
    {
        compare();
    }else{
        return;
    }
}
function compare(){
        var personScore=document.getElementById("person_score").innerHTML;
        var computerScore=document.getElementById("computer_score").innerHTML;
        var p=personScore.match(/\d+/g);
        var c = computerScore.match(/\d+/g);
        if(p>c)
        {
            alert("玩家B胜利");
        }
        else if(p<c)
        {
            alert("玩家A胜利");
        }else if(p==c)
        {
            alert("平局");
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
//定义完整的扑克牌数组
function realCard()
{
    var suitArray = new Array(4);
    for(var i=0;i<suitArray.length;i++) {
        suitArray[i] = new Array(13);
        for (var j = 0; j < 13; j++) {
            suitArray[i][j] = j + 1;
        }
    }
    this.getRealCardArray = function()
    {
        return suitArray;
    }
}
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
function setCard(dealCard,object)
{
    var display;
    if(object==1) {
        display = document.getElementById("person_display");
    }else if(object==2)
    {
        display = document.getElementById("computer_display");
    }

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
function deal()
{
    //生成随机花色，1代表红桃，2代表方片，3代表黑桃，4代表梅花
    var suit = Math.floor(Math.random()*4+1);
    //生成随机牌面数字,11代表J，12代表Q，13代表K
    var number = Math.floor(Math.random()*13+1);
    var dealCard = new card(suit,number);
    return dealCard;
}


function setScore(score,object)
{
    var btn_hit,show_score,btn_stand;
    if(object==1) {
        btn_hit= document.getElementById("person_hit");
        show_score= document.getElementById("person_score");
        btn_stand = document.getElementById("person_stand");
        show_score.innerHTML="B的得分为: "+score;
    }else if(object==2)
    {
        btn_hit=document.getElementById("computer_hit");
        show_score=document.getElementById("computer_score");
        btn_stand = document.getElementById("computer_stand");
        show_score.innerHTML = "A的得分为： " + score;
    }

    if (score >=21) {
        removePerson();
        removeComputer();
        if(object==1)
        {
            if(score==21)
            {
                alert("玩家B胜利");
            }else{
            alert("玩家A胜利");}
        }else if(object==2)
        {
            if(score==21)
            {
                alert("玩家A胜利");
            }else{
                alert("玩家B胜利");}
        }
    }

}

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
function removeComputer()
{
    var computer_hit = document.getElementById("computer_hit");
    var computer_stand = document.getElementById("computer_stand");
    if(computer_hit)
    {
        computer_hit.parentNode.removeChild(computer_hit);
    }
    if(computer_stand)
    {
        computer_stand.parentNode.removeChild(computer_stand);
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

//
//function computer()
//{
//    var card1=deal();
//
//    var card2=deal();
//
//    var computerCardArray=[card1,card2];
//    var score_computer=document.getElementById("score_computer");
//    var sum=getScore(computerCardArray);
//    while(sum<17)
//    {
//        computerCardArray=draw(computerCardArray);
//        sum=getScore(computerCardArray);
//    }
//    score_computer.innerHTML="对手的分数为： "+sum;
//    return sum;
//}




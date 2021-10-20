var current_price = 9750;
var current_total = 4300;
var next_withdrawal = 1300;
var tenc_count = 0;
var tenc_count_trigger = false;
var dollar_count = 0;
var dollar_count_trigger = false;
var ding_audio = new Audio("ding.mp3");
var tada_audio = new Audio("tada.mp3");

var ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
var teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

function convert_millions(num) {
  if (num >= 1000000) {
    return convert_millions(Math.floor(num / 1000000)) + " million " + convert_thousands(num % 1000000);
  } else {
    return convert_thousands(num);
  }
}

function convert_thousands(num) {
  if (num >= 1000) {
    return convert_hundreds(Math.floor(num / 1000)) + " thousand " + convert_hundreds(num % 1000);
  } else {
    return convert_hundreds(num);
  }
}

function convert_hundreds(num) {
  if (num > 99) {
    return ones[Math.floor(num / 100)] + " hundred " + convert_tens(num % 100);
  } else {
    return convert_tens(num);
  }
}

function convert_tens(num) {
  if (num < 10) return ones[num];
  else if (num >= 10 && num < 20) return teens[num - 10];
  else {
    return tens[Math.floor(num / 10)] + " " + ones[num % 10];
  }
}


function convert(num) {
  if (num == 0) return "zero";
  else return convert_millions(num);
}

    //Lock Console
    //console.log = function() {}

        var t=setInterval(crunch_totals,1000);
    function crunch_totals() {
        const pay_date = new Date("2021-10-13");

        const today = Date.now();

        console.log(pay_date);

        const diffTime = Math.abs(today - pay_date);
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        const diffDaysFloor = Math.floor(diffDays);
        const diffDaysMod = diffDays % 14;
        const diffMins = (diffTime / (1000 * 60));
        const diffHours = (diffTime/ (1000 * 60 * 24));
        console.log(diffTime + " milliseconds");
        console.log(diffDays + " days");

        console.log(diffDaysFloor + " days");


        console.log(diffDaysMod + " days");

        document.getElementById("day_count").innerHTML = diffDaysFloor % 14;
        document.getElementById("f_progress").style.width = ((diffDays % 14) / 14.0 * 100.0) + "%";
        console.log(document.getElementById("f_progress").style.width);

        for (i = 0; i < 14; i++) {
            document.getElementById("d" + (i + 1)).disabled = (i < diffDaysMod - 1);
        }

        document.getElementById("next_withdraw").innerHTML = "  -  $" + next_withdrawal;

        const dollars_per_hour = next_withdrawal/(14*24);
        const dollars_per_min = dollars_per_hour/60;
        const tenc_per_min = dollars_per_min*10;

        const time_to_1 = 1/dollars_per_min;
        const time_to_10 = 10/dollars_per_hour;
        const time_to_tenc = 1/tenc_per_min;

        console.log(dollars_per_hour + " per hour");
        console.log(dollars_per_min + " per min");
        console.log(tenc_per_min + " 10c per min");


        console.log(time_to_1 + " hours per 10");
        console.log(time_to_10 + " mins per 1");
        console.log(time_to_tenc + " mins per 10c");


        document.getElementById("time_to_10c").innerHTML = Math.floor(time_to_tenc)+ " minutes " + Math.floor((time_to_tenc%1)*60) + " seconds.";
        document.getElementById("time_to_1").innerHTML = Math.floor(time_to_1) + " minutes " + Math.floor((time_to_1%1)*60) + " seconds.";
        document.getElementById("time_to_10").innerHTML = Math.floor(time_to_10) + " hours " + Math.floor((time_to_10%1)*60) + " minutes.";
       
        //Fix with mod.

        console.log(((diffMins%time_to_1)/time_to_1)*100);
        

        document.getElementById("one_progress").style.width = (((diffMins%time_to_1)/time_to_1)*100) + "%";
        document.getElementById("10c_progress").style.width = (((diffMins%time_to_tenc)/time_to_tenc)*100) + "%";
        document.getElementById("ten_progress").style.width = (((diffHours%time_to_10)/time_to_10)*100) + "%";


        document.getElementById("hypo_pool").innerHTML = convert(Math.floor(diffMins/time_to_1)) + " dollars and " + convert(10*Math.floor((diffMins%time_to_1)/time_to_tenc)) + " cents";

        if(dollar_count < Math.floor(diffMins/time_to_1))
        {
            if(dollar_count_trigger == true)
            {
                tada_audio.play();
                tenc_count_trigger = false;
            }
            else
            {
                dollar_count_trigger = true;
            }
        }

        dollar_count = Math.floor(diffMins/time_to_1);
        if(tenc_count < Math.floor((diffMins%time_to_1)/time_to_tenc))
        {
            if(tenc_count_trigger == true)
            {
                ding_audio.play();
            }
            else
            {
                tenc_count_trigger = true;
            }
        }

        tenc_count = Math.floor((diffMins%time_to_1)/time_to_tenc);


        
    }

    function micro_update()
    {

    }


crunch_totals();

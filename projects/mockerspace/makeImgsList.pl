#!/usr/bin/perl -w

for (my $i=1; $i < 183; $i++) {
    print "<div id=\"thumb-$i\" class=\"print-container\">\n"; 
    print "<a href=\"javascript:loadImage($i);\"><img class=\"print-thumb\" src=\"images/thumb125/thumb125-$i.jpeg\"/></a></div>\n";
}


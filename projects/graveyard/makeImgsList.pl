#!/usr/bin/perl -w

for (my $i=0; $i < 43; $i++) {
    print "<div id=\"thumb-$i\" class=\"print-container\"  onclick=\"onMenuSelect()\">\n"; 
    print "<a href=\"javascript:loadImage($i);\"><img class=\"print-thumb\" src=\"images/thumb125/thumb125-$i.jpeg\"/></a></div>\n";
}


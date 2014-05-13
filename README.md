skrutt
====================================
Skrutt is a MVC inspired framework for webdevolpment. 
To see the framwork, go to <code>http://www.student.bth.se/~embj12/phpmvc/kmom08-Exam3/skrutt/page/view/9</code>
To logg in:
_____________________
Username: doe

Password: doe
______________________
or 
______________________
Username: root

Password: root
______________________
You can also create your own account to logg in.

Do you like what you see?

To make your owns framework like skrutt, all you need to do is following these easy steps:

Installation
-------------

1. Clone skrutt from github: <code>https://github.com/Emmisen/skrutt</code>
2. Make the application/data writeable: <code>cd skrutt; chmod 777 application/data</code>
(Both the map and the file in the map, most be chmod 777)
3. Open the .htaccess file, and change the adress to your installation
 <code>RewriteBase /~embj12/phpmvc/kmom08/skrutt/</code>
4. Point your webbbrowser to your skrutt, and follow the instruction!
<code>module/install</code>


Change logo, Title, Footer and Navigation menu.
--------------------


Open the file <code>skrutt/application/config.php</code>


scroll down to "Settings for the theme. The theme may have a parent theme."
<code>$sk->config['theme'] = array(</code>

Here you can change logo, webbplatsens titel, footer and navigation menu.

If you wanna change the look of your framework, you can also go into <code>skrutt/application/themes/mytheme/style.css</code>


Create a new blog entry.
--------------------

To create a blogg post is very easy. All you have to do is:

1. Open the framework in your webbrowser.
2. click on "blog"
3. click on "edit" on one of the blog entries.
4. click on "create new"
5. Make a new blog entry. Make sure that "Type" is "post", and Filter is "plain"
6. save


Create a new page.
--------------------

1. Open the framework in your webbrowser
2. Click on "About me"
3. Click on edit
4. Click on "Create new"
5. Click save when you are done.

If you want your new page to show up in the navigation menu, all you have to do is:

1. Open the file <code>skrutt/application/config.php</code>
2. scroll down to "Define menus."
3. add a line at the end of <code>'my-navbar' => array(</code>

Example -> <code>'page' => array('label'=>'page', 'url'=>'page/view/9'),</code>



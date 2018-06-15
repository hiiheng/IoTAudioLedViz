# LED Audio Visualization

<pre>
PROJECT_ROOT  
├─src  
├─views  
├─gulpfile.js  
├─package.json  
└─server.js  

./src/public  
├─css  
├─js
├─vendor
└─audio

./src/routes  
└─.js files

./src/util 
└─.js files  
</pre>

## Getting Started
References:  
[1] http://jakebergamin.com/2016/02/08/wifi-led-strip/  
[2] https://p5js.org/reference/#/libraries/p5.sound  
<blockquote>
    In this project, instead of using the Android application from the provided link, I put together a quick and crude web application to model a working prototype for the Audio WiFi LED application.  Everything else including the circuit is mostly if not entirely the same.
</blockquote>
</br>
<blockquote>
Clone the project and install dependencies.<br/>
<code>
 $ clone https://github.com/hiiheng/IoTAudioLedViz.git app && cd app && npm install<br/>
</code>
Run gulp to compile src files.<br/>
<code>
 $ gulp<br/>
</blockquote>
<blockquote>
</code>
Generate source documentation.<br/>
<code>
 $ npm run document
</code>
</blockquote>
<blockquote>
Run the server.<br/>
<code>
 $ npm start
</code>
</blockquote>
var entered = false;
var comments_loaded = false;
var yt_comments = []
var video_id;
chrome.tabs.query({currentWindow: true, active: true},
 async function (tabs) {
    try {
      video_id = tabs[0].url.split('v=')[1];
      var ampersandPosition = video_id.indexOf('&');
      if(ampersandPosition != -1) {
          video_id = video_id.substring(0, ampersandPosition);
      }
      var url=`https://put-your-own-url-that-gives-sentiment-data-based-on-video-id.herokuapp.com/?id=${video_id}`;
      fetch(url,{
        method:'POST',
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then((res) =>{
        if (res.ok) {
            return res.json() 
        } else {
            return Promise.reject({ status: res.status, statusText: res.statusText });
        }   
    })
    .then((data) =>{ 
        console.log(data)
        document.getElementById('reload-message').style.display = 'none';
        document.getElementById('api-error').style.display = 'none';
        document.getElementById('initial content').style.display = 'none';
        document.getElementById('sentiment-analysis').style.display = 'block';
        document.getElementById('results').innerHTML = "Results:- ";
        document.getElementById('comments-analyzed').innerHTML = data["People thought it was neutral"];
        document.getElementById('comments-analyzed2').innerHTML = data["People thought it was strongly negative"];
        document.getElementById('comments-analyzed3').innerHTML = data["People thought it was strongly positive"];
        document.getElementById('comments-analyzed4').innerHTML = data["People thought it was weakly negative"];
        document.getElementById('comments-analyzed5').innerHTML = data["People who thought it negative"];
        document.getElementById('comments-analyzed6').innerHTML = data["People who thought it was positive"];
  })
  .catch((e)=>{
        document.getElementById('api-error').style.display = 'block';
        document.getElementById('initial content').style.display = 'none';
  })
    }catch{
        document.getElementById('reload-message').style.display = 'block';
        document.getElementById('initial content').style.display = 'none';
    }
  });

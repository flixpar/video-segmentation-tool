from flask import Flask
app = Flask(__name__)

@app.route('/')
@app.route('/videos')
def index():
    return render_template("index.html")

@app.route('/videos/<vid_id>')
def video(vid_id=None):
    vid_path = vid_id
    return render_template("video.html", vid_path=vid_path)

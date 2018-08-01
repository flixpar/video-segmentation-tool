from flask import Flask
from flask import url_for, render_template

from flask_socketio import SocketIO
from flask_socketio import send, emit

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
@app.route('/videos')
def index():
    return render_template("index.html")

@app.route('/videos/<vid_id>')
def video(vid_id=None):
    vid_path = vid_id
    return render_template("video.html", vid_path=vid_path)

@socketio.on('get_frames')
def get_frames(vid_id):
    frame_list = ["a", "b", "c"]
    emit("recieve_frames", frame_list, json=True)

@socketio.on('update_segm')
def get_frames(vid_id, data):
    print('received: ' + str(data))

if __name__ == '__main__':
    socketio.run(app)

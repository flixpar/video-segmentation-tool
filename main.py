from flask import Flask
from flask import url_for, render_template

from flask_socketio import SocketIO
from flask_socketio import send, emit

import os
import glob

from tinydb import TinyDB, Query


app = Flask(__name__)
socketio = SocketIO(app)

db = TinyDB('db.json')


@app.route('/')
@app.route('/videos')
def index():
    vid_paths  = glob.glob("static/data/*.mp4")
    vid_paths  = sorted(list(vid_paths))
    vid_names  = [os.path.basename(fn)[:-4] for fn in vid_paths]
    vid_titles = [n[4:6] + '/' + n[6:8] + '/' + n[:4] + ' ' + n[9:] + ':00' for n in vid_names]
    vid_list   = list(zip(vid_names, vid_titles))
    return render_template("index.html", vid_list=vid_list)

@app.route('/videos/<vid_id>')
def video(vid_id):
    vid_path = "data/" + vid_id + ".mp4"
    return render_template("video.html", vid_path=vid_path, vid_id=vid_id)

@socketio.on('update_segm')
def update_segm(vid_id, data):
    db.upsert({"vid_id": vid_id, "data": data}, Query().vid_id==vid_id)

@socketio.on('query_segm')
def send_segm(vid_id):
    vid = db.search(Query().vid_id == vid_id)
    if vid:
        socketio.emit("get_segm", vid[0]["data"])
    else:
        socketio.emit("get_segm", [])

if __name__ == '__main__':
    socketio.run(app)

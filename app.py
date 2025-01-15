from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask import redirect



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200), nullable=False)
    completed = db.Column(db.Integer, default=0)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    def __repr__(self):
        return '<Task %r>' %self.id
with app.app_context():
    # Your code that requires the application context goes here
    db.create_all()

@app.route('/', methods=['POST', 'GET'])
def index():
    if request.method == 'POST':
        task_content = request.form['content']
        new_task = Task(content=task_content)

        try: 
            db.session.add(new_task)
            db.session.commit()
            return redirect('/')
        except:
            return 'There was an issue adding your task'
        
    else:
        tasks = Task.query.order_by(Task.date_created).all()
        return render_template('index.html', tasks=tasks)
    
@app.route('/delete/<int:id>')
def delete(id):
    task_to_delete = Task.query.get_or_404(id)

    try:
        db.session.delete(task_to_delete)
        db.session.commit()
        return redirect('/')
    except:
        return 'There was a problem deleting that task'

@app.route('/update/<int:id>', methods=['GET', 'POST'])
def update(id):
    task = Task.query.get_or_404(id)

    if request.method == 'POST':
        task.content = request.form['content']

        try:
            db.session.commit()  
            return redirect('/')
        except:
            return 'There was an issue updating your task'
    else:
        return render_template('update.html', task=task)

@app.route('/login')
def about():
    return render_template('base.html')

@app.route('/register')
def contact():
    return render_template('base.html')

if __name__ == '__main__':
    app.run(debug=True)
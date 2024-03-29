from flask import Flask, render_template, redirect, url_for, request

app = Flask(__name__)

# Dummy user credentials (replace with actual user authentication logic)
VALID_USERNAME = 'admin'
VALID_PASSWORD = 'admin123'

@app.route('/')
def login():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def process_login():
    username = request.form.get('username')
    password = request.form.get('password')

    if username == VALID_USERNAME and password == VALID_PASSWORD:
        # Redirect to dashboard page on successful login
        return redirect(url_for('dashboard'))
    else:
        # Redirect back to login page with error message
        return render_template('login.html', error=True)

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

if __name__ == '__main__':
    app.run(debug=True)

-- Create Database
CREATE DATABASE IF NOT EXISTS lms_db;
USE lms_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('superadmin', 'admin', 'student') NOT NULL DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses Table
CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    teacher_id INT,
    category VARCHAR(100),
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Enrollments Table
CREATE TABLE IF NOT EXISTS enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    progress INT DEFAULT 0,
    status ENUM('active', 'completed', 'dropped') DEFAULT 'active',
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_enrollment (student_id, course_id)
);

-- Assignments Table
CREATE TABLE IF NOT EXISTS assignments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Submissions Table
CREATE TABLE IF NOT EXISTS submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    assignment_id INT NOT NULL,
    student_id INT NOT NULL,
    file_url VARCHAR(255),
    grade VARCHAR(10),
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Messages Table
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Seed Initial Users
INSERT IGNORE INTO users (username, email, password, role) VALUES 
('superadmin', 'superadmin@gmail.com', 'superadmin@123', 'superadmin'),
('admin', 'admin@gmail.com', 'admin@123', 'admin'),
('student', 'student@gmail.com', 'student@123', 'student'),
('emma_wilson', 'emma@gmail.com', 'student@123', 'student'),
('noah_miller', 'noah@gmail.com', 'student@123', 'student');

-- Seed Courses
INSERT IGNORE INTO courses (title, description, teacher_id, category, image_url) VALUES
('Advanced React Patterns', 'Master hooks, render props, and higher-order components.', 2, 'Development', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee'),
('UI/UX Design Fundamentals', 'Learn the basics of user interface and experience design.', 2, 'Design', 'https://images.unsplash.com/photo-1586717791821-3f44a563de4c'),
('Python for Data Science', 'Data analysis and visualization using Python and Pandas.', 2, 'Data Science', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71'),
('Mobile App Development', 'Build cross-platform mobile apps with React Native.', 2, 'Development', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c');

-- Seed Enrollments
INSERT IGNORE INTO enrollments (student_id, course_id, progress, status) VALUES
(3, 1, 85, 'active'),
(3, 2, 62, 'active'),
(4, 1, 45, 'active'),
(5, 3, 92, 'active');

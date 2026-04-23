async function testAddStudent() {
  try {
    const response = await fetch("http://localhost:5000/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-role": "admin"
      },
      body: JSON.stringify({
        username: "testuser_" + Date.now(),
        email: "test_" + Date.now() + "@example.com",
        password: "password123"
      })
    });
    const data = await response.json();
    console.log("Status:", response.status);
    console.log("Data:", data);
  } catch (error: any) {
    console.error("Error:", error.message);
  }
}

testAddStudent();

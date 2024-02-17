import app from "@/app"

// Define a Port
const PORT = process.env.PORT || 5100
app.listen(PORT, () => console.log(`Sever is running on http://localhost:${PORT}/`))
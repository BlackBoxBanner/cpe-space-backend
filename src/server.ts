import app from "@/app"
import { PORT_ENV } from "@/utils/env";

// Define a Port
const PORT = PORT_ENV
app.listen(PORT, () => console.log(`Sever is running on http://localhost:${PORT}/`))
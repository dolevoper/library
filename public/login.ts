document.forms.namedItem("login")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const formData = new FormData(e.target);
        const body = JSON.stringify({
            username: formData.get("username"),
            password: formData.get("password")
        });

        const res = await fetch("/api/auth/login", {
            method: "POST",
            body,
            headers: {
                "Content-Type": "application/json",
                "Content-Length": body.length.toString()
            }
        });

        if (res.status >= 400) {
            throw new Error(await res.text());
        }

        window.location.replace("/");
    } catch (err) {
        console.error(err);
        alert((err as Error).message);
    }
});
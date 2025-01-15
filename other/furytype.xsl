<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:fury="http://example.com/furytype"
                exclude-result-prefixes="fury"
                version="1.0">

    <!-- Output method -->
    <xsl:output method="html" indent="yes"/>

    <!-- XSLT Root Template -->
    <xsl:template match="/fury:furytype">
        <html lang="en">
            <head>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Typing Practice Scores - FuryType</title>
                <style>
                    /* Default Dark Mode */
                    body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.8;
                    margin: 0;
                    padding: 0;
                    background-color: #1e1e2f; /* Dark background */
                    color: #e4e4e4; /* Light text */
                    transition: background-color 0.3s ease, color 0.3s ease;
                    }

                    header {
                    background: #282c34; /* Dark header */
                    color: white;
                    padding: 20px;
                    text-align: center;
                    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.4);
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    }

                    h1 {
                    margin: 0;
                    font-size: 2.5rem;
                    color: #ff8c00;
                    }

                    table {
                    width: 90%;
                    margin: 30px auto;
                    border-collapse: collapse;
                    background: #2c2f3f; /* Dark table background */
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                    }

                    th, td {
                    padding: 15px;
                    text-align: center;
                    border-bottom: 1px solid #444;
                    font-size: 1.1rem;
                    }

                    th {
                    background: #ff8c00; /* Highlighted header */
                    color: white;
                    text-transform: uppercase;
                    font-weight: bold;
                    }

                    tr:hover {
                    background-color: #444;
                    }

                    tr:last-child td {
                    border-bottom: none;
                    }

                    p {
                    text-align: center;
                    font-size: 1.2rem;
                    color: #ff8c00;
                    }

                    .conditional-message {
                    font-style: italic;
                    color: #d4d4d4;
                    }

                    /* Theme Toggle Button */
                    .theme-switch {
                    position: absolute;
                    top: 20px;
                    right: 30px;
                    background: #ff8c00;
                    color: white;
                    border: none;
                    border-radius: 20px;
                    padding: 10px 20px;
                    cursor: pointer;
                    font-size: 1rem;
                    transition: background-color 0.3s ease, color 0.3s ease;
                    }

                    .theme-switch:hover {
                    background: #e67800;
                    }

                    /* Light Mode */
                    .light-mode body {
                    background-color: #f9f9f9; /* Light background */
                    color: #1e1e2f; /* Dark text */
                    }

                    .light-mode header {
                    background: #007bff; /* Light header background */
                    color: white;
                    }

                    .light-mode table {
                    background: #ffffff; /* Light table background */
                    color: #1e1e2f; /* Dark table text */
                    }

                    .light-mode th {
                    background: #007bff; /* Light table header */
                    color: white;
                    }

                    .light-mode tr:hover {
                    background-color: #e9e9e9; /* Light hover effect */
                    }

                    .light-mode .theme-switch {
                    background: #007bff;
                    color: white;
                    }

                    .light-mode .theme-switch:hover {
                    background: #0056b3;
                    }
                </style>
                <script>
                    function toggleTheme() {
                    document.body.classList.toggle("light-mode");
                    }
                </script>
            </head>
            <body>
                <header>
                    <h1>Typing Practice Scores</h1>
                    <button class="theme-switch" onclick="toggleTheme()">Toggle Light Mode</button>
                </header>

                <!-- Users Table -->
                <table>
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Score</th>
                        <th>Time Taken</th>
                    </tr>
                    <xsl:apply-templates select="fury:user"/>
                </table>

                <!-- Conditional Rendering -->
                <xsl:if test="count(fury:user) = 0">
                    <p class="conditional-message">No user data available.</p>
                </xsl:if>

                <!-- Choose and Apply Templates -->
                <xsl:choose>
                    <xsl:when test="count(fury:user) > 5">
                        <p class="conditional-message">Showing top scores only.</p>
                    </xsl:when>
                    <xsl:otherwise>
                        <p class="conditional-message">Displaying all user scores.</p>
                    </xsl:otherwise>
                </xsl:choose>
            </body>
        </html>
    </xsl:template>

    <!-- Template for user row -->
    <xsl:template match="fury:user">
        <tr>
            <td><xsl:value-of select="fury:id"/></td>
            <td><xsl:value-of select="fury:name"/></td>
            <td><xsl:value-of select="fury:score"/></td>
            <td><xsl:value-of select="fury:time"/></td>
        </tr>
    </xsl:template>
</xsl:stylesheet>
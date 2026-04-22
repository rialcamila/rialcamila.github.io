let pastCommands = [];
let timesPressedUp = 0;

document.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        timesPressedUp = 0;
        addComment();
        document.querySelector(".comment-div").scrollIntoView();
    } else if (e.key == "ArrowUp") {
        if (pastCommands.length > timesPressedUp) (timesPressedUp++);
        let lastCommand = pastCommands[pastCommands.length - timesPressedUp];
        document.querySelector(".user-command").value = lastCommand;
        if (document.querySelector(".user-command").value == "undefined") {
            document.querySelector(".user-command").value = "";
        }
    } else if (e.key == "ArrowDown") {
        if (timesPressedUp == 0) {
            document.querySelector(".user-command").value = "";
            if (document.querySelector(".user-command").value == "undefined") {
                document.querySelector(".user-command").value = "";
            }
        } else if (0 < timesPressedUp) {
            timesPressedUp--;
            let lastCommand = pastCommands[pastCommands.length - timesPressedUp];
            document.querySelector(".user-command").value = lastCommand;
            if (document.querySelector(".user-command").value == "undefined") {
                document.querySelector(".user-command").value = "";
            }
        }
    } else if (e.key == "Tab") {
        e.preventDefault();
        let ongoingInput = document.querySelector(".user-command").value;
        let dict = typeof commandDict[currentlyIn] == "object" ? Object.keys(commandDict[currentlyIn]) : commandDict[currentlyIn];
        ongoingInput === "" ? document.querySelector(".user-command").value = "" : dict.map((cmd) => {
            if (cmd.startsWith(ongoingInput)) document.querySelector(".user-command").value = cmd;
        })
    }
})

export let commentsDiv = document.querySelector(".comments");

let themes = ["dark", "default", "light", "cute"];
let rootCmds = {
    "about": `<div>Hey, I'm <span class="purple">Camila Rial</span>! <br> I'm a programming student who wants to build good, responsive and secure websites and aplications!</div>`,
    "education": ["Programming Course - IEFP Gaia (Currently enrolled)", "Bachelor in Art History - Rio de Janeiro State University (GPA: 3.98)", "Audiovisual Production - Adolpho Bloch Technical State School", "Culinary Arts and Management - School of Hospitality and Tourism Porto", "Exchange Student in India - Culinary Arts and Management", "Exchange Student Erasmus Bilbao"],
    "skills": `<div><p>Languages:  <span class="purple">Portuguese</span> (native),  <span class="purple">English</span> (fluent),  <span class="purple">Spanish</span> (advanced),  <span class="purple">French</span> (basic),  <span class="purple">German</span> (basic)</p>
        <p>Programming languages: Python, C, C#, JAVA, HTML, CSS, JavaScript, ASP.Net, PHP, SQL and MongoDB.</p>
        <p>Developer Tools: Git/Github.</p>
        <p>OS: Windows, Linux, MacOS.</p></div>`,
    "interests": `<div>I like coding, designing, drawing, writing & reading novels. </div>`,
    "information": `<div>This is how this project was made:
            <br/><br/>
            I used vanilla JavaScript, HTML and CSS while creating this project.<br/>
            The Terminal file and window are both draggable. The terminal window can be resized.<br/>
            The Terminal window can be minimized, maximized and closed. When minimized, the contents will remain but if X is pressed, the contents will reset.<br/>
            Previous commands entered this session can be accessed by using the up/down arrows on your keyboard. Pressing TAB will complete the input.<br/>
            <br/><br/>
                                </div>`,
    "certificates": ["CS50's Introduction to Databases with SQL - Harvard University", "HTML Essentials - CISCO Networking Academy", "CSS Essentials - CISCO Networking Academy", "Computer Hardware Basics - CISCO Networking Academy", "Operating Systems Basics - CISCO Networking Academy", "OWASP Top10 - TryHackMe", "C Advanced Course - CISCO Networking Academy (loading...)"],
    "experience": ["Post-Production Department - TV Globo", "Airport Terminal Agent - RioGaleão (GIG)", "Art Gallery Assistant - Anna Maria Niemeyer Art Gallery", "GameMaster - D3 Escape Room"],
    "get linkedin": "https://www.linkedin.com/in/camila-rial/",
    "get github": "https://www.github.com/rialcamila",
    "cd themes": "Here are some themes you can change into: ",
};
let mainCmds = ["clear", "ls", "cd ..", "help"];
let allCmds = [...mainCmds, ...Object.keys(rootCmds), ...themes];
let currentlyIn = "root";
let commandDict = {
    "root": rootCmds,
    "themes": themes,
};


let userCommandDiv = document.querySelector(".user-command");
userCommandDiv.addEventListener("focus", (e) => {
  e.preventDefault();
})

function addComment() {
    let newComment = document.createElement("div");
    newComment.classList.add(".user-comment");

    let userCommandDiv = document.querySelector(".user-command");
    let userCommand = document.querySelector(".user-command").value.trim();
    let directory = document.querySelector(".directory");
    if (userCommand === "") {
        commentsDiv.innerHTML += `<div>Please enter a command.</div>`;
        return;
    }
    pastCommands.push(userCommand);
    newComment.innerText = `> ${userCommand}`;
    commentsDiv.appendChild(newComment);

    if (allCmds.includes(userCommand)) {
        if (userCommand == "clear") {
            commentsDiv.innerHTML = "";
        } else if (userCommand == "help") {
            let currentDirArray = currentlyIn === "root" ? [...Object.keys(rootCmds), ...mainCmds] : [...themes, ...mainCmds];
            commentsDiv.innerHTML += `<ul> ${currentDirArray.map((command) => {
                return `<li class="ls-item">${command}</li>`;
            }).join("")} </ul>`;
        } else if (userCommand == "ls") {
            if (currentlyIn === "themes") {
                commentsDiv.innerHTML += `<div class="ls-cont"> ${[...themes, "root"].map((theme) => {
                    return `<div class="ls-item">${theme}</div>`;
                }).join("")} </div>`;
            } else {
                commentsDiv.innerHTML += `<div class="ls-cont"> ${Object.keys(rootCmds).map((command) => {
                    return `<div class="ls-item">${command}</div>`;
                }).join("")} </div>`;
            }
        } else if (userCommand == "cd ..") {
            if (currentlyIn == "root") {
                commentsDiv.innerHTML += `<div>Already in the root directory.</div>`;
                userCommandDiv.value = "";
                return;
            }
            currentlyIn = "root";
            let directories = directory.innerText.split("/");
            directories.pop();
            directory.innerHTML = "";
            directory.innerHTML = directories.map((x) => {
                if (x !== "") return `/${x}`;
            }).join('');
        } else if (currentlyIn === "root" && Object.keys(rootCmds).includes(userCommand) || themes.includes(userCommand)) {
            if (userCommand.startsWith("get ")) {
                window.open(rootCmds[userCommand]);
                return;
            } else if (userCommand === "experience" || userCommand === "certificates" || userCommand === "education") {
                commentsDiv.innerHTML += `<ul>${rootCmds[userCommand].map((x) => {
                    return `<li>${x}</li>`;
                }).join("")}</ul>`;
                userCommandDiv.value = "";
                return;
            } if (userCommand === "cd themes") {
                currentlyIn = "themes";
                directory.innerHTML += "/themes";
                commentsDiv.innerHTML += `<ul>${themes.map((theme) => {
                    return `<li>${theme}</li>`;
                }).join("")}</ul>`;
            } else if (currentlyIn === "themes" && themes.includes(userCommand)) {
                changeTheme(userCommand);
            } else {
                commentsDiv.innerHTML += rootCmds[userCommand];
            }
        } else if (currentlyIn === "themes" && Object.keys(rootCmds).includes(userCommand)) {
            handleInvalidCommand(userCommand);
        }
    }
    else {
        handleInvalidCommand(userCommand);
    }
    userCommandDiv.value = "";
}
function changeTheme(theme) {
    let domBody = document.querySelector("body");
    let pastTheme = domBody.className;
    theme == "light" ? commentsDiv.innerHTML += `<div>"${theme}" theme selected. Protect your eyes!</div>` : commentsDiv.innerHTML += `<div>"${theme}" theme selected.</div>`;
    domBody.classList.remove(pastTheme);
    domBody.classList.add(theme);
}

function handleInvalidCommand(cmmd) {
    commentsDiv.innerHTML += `<div>The term <span class="green">'${cmmd}'</span> is not recognized as the name of a command. Please type <span class="red">help</span> to see a list of possible commands.</div>`;
}

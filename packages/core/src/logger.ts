/**
 * Class representing a custom logging utility.
 *
 * @class
 */
 */
class ElizaLogger {
/**
 * Constructor for ElizaLogger class.
 * Checks if the code is running in a Node.js environment,
 * sets the verbose flag based on the environment,
 * and logs the initialization details.
 */
    constructor() {
        // Check if we're in Node.js environment
        this.isNode =
            typeof process !== "undefined" &&
            process.versions != null &&
            process.versions.node != null;

        // Set verbose based on environment
        this.verbose = this.isNode ? process.env.VERBOSE === "true" : false;

        // Add initialization logging
        console.log(`[ElizaLogger] Initializing with:
            isNode: ${this.isNode}
            verbose: ${this.verbose}
            VERBOSE env: ${process.env.VERBOSE}
            NODE_ENV: ${process.env.NODE_ENV}
        `);
    }

    private isNode: boolean;
    verbose = false;
    closeByNewLine = true;
    useIcons = true;
    logsTitle = "LOGS";
    warningsTitle = "WARNINGS";
    errorsTitle = "ERRORS";
    informationsTitle = "INFORMATIONS";
    successesTitle = "SUCCESS";
    debugsTitle = "DEBUG";
    assertsTitle = "ASSERT";

/**
 * Get the CSS styling for foreground and background colors based on the provided color names.
 * If running in a browser environment, it returns the CSS styling. If running in a Node.js environment, it returns the ANSI escape codes for console coloring.
 * @param {string} foregroundColor - The name of the foreground color. Default is an empty string.
 * @param {string} backgroundColor - The name of the background color. Default is an empty string.
 * @returns {string} The CSS styling for the colors if in a browser environment, or ANSI escape codes for console coloring if in a Node.js environment.
 */
    #getColor(foregroundColor = "", backgroundColor = "") {
        if (!this.isNode) {
            // Browser console styling
            const colors: { [key: string]: string } = {
                black: "#000000",
                red: "#ff0000",
                green: "#00ff00",
                yellow: "#ffff00",
                blue: "#0000ff",
                magenta: "#ff00ff",
                cyan: "#00ffff",
                white: "#ffffff",
            };

            const fg = colors[foregroundColor.toLowerCase()] || colors.white;
            const bg = colors[backgroundColor.toLowerCase()] || "transparent";
            return `color: ${fg}; background: ${bg};`;
        }

        // Node.js console colors
        let fgc = "\x1b[37m";
        switch (foregroundColor.trim().toLowerCase()) {
            case "black":
                fgc = "\x1b[30m";
                break;
            case "red":
                fgc = "\x1b[31m";
                break;
            case "green":
                fgc = "\x1b[32m";
                break;
            case "yellow":
                fgc = "\x1b[33m";
                break;
            case "blue":
                fgc = "\x1b[34m";
                break;
            case "magenta":
                fgc = "\x1b[35m";
                break;
            case "cyan":
                fgc = "\x1b[36m";
                break;
            case "white":
                fgc = "\x1b[37m";
                break;
        }

        let bgc = "";
        switch (backgroundColor.trim().toLowerCase()) {
            case "black":
                bgc = "\x1b[40m";
                break;
            case "red":
                bgc = "\x1b[44m";
                break;
            case "green":
                bgc = "\x1b[44m";
                break;
            case "yellow":
                bgc = "\x1b[43m";
                break;
            case "blue":
                bgc = "\x1b[44m";
                break;
            case "magenta":
                bgc = "\x1b[45m";
                break;
            case "cyan":
                bgc = "\x1b[46m";
                break;
            case "white":
                bgc = "\x1b[47m";
                break;
        }

        return `${fgc}${bgc}`;
    }

/**
 * Get the color reset code based on the environment.
 * 
 * @returns {string} The color reset code ("\x1b[0m" in Node environment, empty string otherwise).
 */
    #getColorReset() {
        return this.isNode ? "\x1b[0m" : "";
    }

/**
 * Clears the console by calling console.clear()
 */
    clear() {
        console.clear();
    }

/**
 * Prints the provided strings with the specified foreground color and background color.
 * If objects are provided in the strings, they are converted to strings using JSON.stringify.
 *
 * @param {string} foregroundColor - The foreground color for the printed text. Default is "white".
 * @param {string} backgroundColor - The background color for the printed text. Default is "black".
 * @param {Array.<string|object>} strings - The strings to be printed.
 * @returns {void}
 */
    print(foregroundColor = "white", backgroundColor = "black", ...strings) {
        // Convert objects to strings
        const processedStrings = strings.map((item) => {
            if (typeof item === "object") {
                return JSON.stringify(item, (key, value) =>
                    typeof value === "bigint" ? value.toString() : value
                );
            }
            return item;
        });

        if (this.isNode) {
            const c = this.#getColor(foregroundColor, backgroundColor);
            console.log(c, processedStrings.join(""), this.#getColorReset());
        } else {
            const style = this.#getColor(foregroundColor, backgroundColor);
            console.log(`%c${processedStrings.join("")}`, style);
        }

        if (this.closeByNewLine) console.log("");
    }

/**
 * Logs the given strings with a specified style, including foreground and background colors, icon, and group title.
 * @param {any[]} strings - An array of strings to be logged.
 * @param {object} options - An object containing the style options with the following properties:
 * @param {string} options.fg - The foreground color for the log.
 * @param {string} options.bg - The background color for the log.
 * @param {string} options.icon - The icon to display along with the group title.
 * @param {string} options.groupTitle - The title for the log group.
 */
    #logWithStyle(
        strings: any[],
        options: {
            fg: string;
            bg: string;
            icon: string;
            groupTitle: string;
        }
    ) {
        const { fg, bg, icon, groupTitle } = options;

        if (strings.length > 1) {
            if (this.isNode) {
                const c = this.#getColor(fg, bg);
                console.group(c, (this.useIcons ? icon : "") + groupTitle);
            } else {
                const style = this.#getColor(fg, bg);
                console.group(
                    `%c${this.useIcons ? icon : ""}${groupTitle}`,
                    style
                );
            }

            const nl = this.closeByNewLine;
            this.closeByNewLine = false;
            strings.forEach((item) => {
                this.print(fg, bg, item);
            });
            this.closeByNewLine = nl;
            console.groupEnd();
            if (nl) console.log();
        } else {
            this.print(
                fg,
                bg,
                strings.map((item) => {
                    return `${this.useIcons ? `${icon} ` : ""}${item}`;
                })
            );
        }
    }

/**
 * Logs the given strings with specified style.
 * 
 * @param {...string} strings - The strings to be logged
 * @returns {void}
 */
    log(...strings) {
        this.#logWithStyle(strings, {
            fg: "white",
            bg: "",
            icon: "\u25ce",
            groupTitle: ` ${this.logsTitle}`,
        });
    }

/**
 * Logs warning messages with a specified style.
 * 
 * @param {...string} strings - The messages to log as warnings.
 */
    warn(...strings) {
        this.#logWithStyle(strings, {
            fg: "yellow",
            bg: "",
            icon: "\u26a0",
            groupTitle: ` ${this.warningsTitle}`,
        });
    }

/**
* Logs an error message with red foreground color, no background color, and an exclamation icon.
* @param {...string} strings - The error message to log
*/
    error(...strings) {
        this.#logWithStyle(strings, {
            fg: "red",
            bg: "",
            icon: "\u26D4",
            groupTitle: ` ${this.errorsTitle}`,
        });
    }

/**
 * Logs information with blue foreground color and information icon.
 * 
 * @param {...string} strings - Strings to be logged
 */
    info(...strings) {
        this.#logWithStyle(strings, {
            fg: "blue",
            bg: "",
            icon: "\u2139",
            groupTitle: ` ${this.informationsTitle}`,
        });
    }

/**
 * Logs debug messages with specified styling if verbose mode is enabled.
 * 
 * @param {...string} strings - The debug messages to log.
 */
    debug(...strings) {
        if (!this.verbose) {
            // for diagnosing verbose logging issues
            // console.log(
            //     "[ElizaLogger] Debug message suppressed (verbose=false):",
            //     ...strings
            // );
            return;
        }
        this.#logWithStyle(strings, {
            fg: "magenta",
            bg: "",
            icon: "\u1367",
            groupTitle: ` ${this.debugsTitle}`,
        });
    }

/**
 * Logs the given strings with a green style and a checkmark icon to indicate success.
 * @param {...string} strings - The strings to be logged
 */
    success(...strings) {
        this.#logWithStyle(strings, {
            fg: "green",
            bg: "",
            icon: "\u2713",
            groupTitle: ` ${this.successesTitle}`,
        });
    }

/**
 * Asserts the provided strings and logs them with a cyan foreground color, no background color, and an exclamation icon.
 * @param {...string} strings - The strings to be logged
 */
    assert(...strings) {
        this.#logWithStyle(strings, {
            fg: "cyan",
            bg: "",
            icon: "\u0021",
            groupTitle: ` ${this.assertsTitle}`,
        });
    }

/**
 * Displays a progress message either by updating the current line or by logging a new line.
 * 
 * @param {string} message - The message to be displayed as progress.
 */
    progress(message: string) {
        if (this.isNode) {
            // Clear the current line and move cursor to beginning
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            process.stdout.write(message);
        } else {
            console.log(message);
        }
    }
}

export const elizaLogger = new ElizaLogger();
elizaLogger.closeByNewLine = true;
elizaLogger.useIcons = true;

export default elizaLogger;

import React, { useState, useEffect, useRef } from "react";
import "./ResumeBuilder.css";
import jspdf from "jspdf";
import "jspdf-autotable";
import { Document, Page } from "react-pdf";
import logo from '../assets/resumeLogo.png';
import mainLogo from '../assets/mainLogo.png';
import { FaDownload } from "react-icons/fa";



function ResumeBuilder() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [pdfDataUrl, setPdfDataUrl] = useState(null);
    const [workExperience, setWorkExperience] = useState([
        { jobTitle: "", company: "", employmentPeriod: "" },
    ]);
    const [education, setEducation] = useState([
        { degree: "", institution: "", completionDate: "" },
    ]);
    const [theme, setTheme] = useState("lightgreen");
    const [color, setColor] = useState("white");
    const [about, setAbout] = useState("");

    // Preview Components
    let prComp = '';
    let prJt = '';
    let prStart = '';
    let prEnd = '';

    let prUni = '';
    let prDeg = '';
    let prGy = '';

    // Map Data For Education section & Work Experience Section
    const educationData = education.map((edu) => {
        const { degree, institution, completionDate } = edu;
        prUni = institution; prDeg = degree; prGy = completionDate;
        return [degree, institution, completionDate];
    });

    const workExperienceData = workExperience.map((exp) => {
        const { company, jobTitle, startDate, endDate } = exp;
        prComp = company; prJt = jobTitle; prStart = startDate; prEnd = endDate;
        return [company, jobTitle, startDate, endDate];
    });

    // State updater functions
    const handleAboutChange = (event) => {
        setAbout(event.target.value);
    }

    const handleThemeChange = (event) => {
        setTheme(event.target.value);
        document.querySelector('.ResumeBuilder').style.backgroundColor = 'white';
        switch (event.target.value) {
            case "jet":
                document.body.style.background = "#2A2D31";
                document.getElementById("theme-select").style.backgroundColor = "#2A2D31";
                document.getElementById("theme-select").style.color = 'white';
                break;
            case "royalpurple":
                document.body.style.background = "#6F5392";
                break;
            case "darkcornflowerblue":
                document.body.style.background = "#2C446F";
                break;
            case "egyptianblue":
                document.body.style.background = "#20349F";
                break;
            case "bluegreen":
                document.body.style.background = "#359EBF";
                break;
            case "slategray":
                document.body.style.background = "#6C7F93";
                document.getElementById("theme-select").style.backgroundColor = "#6C7F93";
                document.getElementById("theme-select").style.color = 'white';
                break;
            case "bluegray":
                document.body.style.background = "#799ACC";
                break;
            case "viridiangreen":
                document.body.style.background = "#468F92";
                break;
            case "opal":
                document.body.style.background = "#B2D1C9";
                break;
            case "darkseagreen":
                document.body.style.background = "#90AE85";
                document.getElementById("theme-select").style.backgroundColor = "#90AE85";
                document.getElementById("theme-select").style.color = 'white';
                break;
            case "ferngreen":
                document.body.style.background = "#647C41";
                break;
            case "bronze":
                document.body.style.background = "#CD853F";
                document.getElementById("theme-select").style.backgroundColor = "#CD853F";
                document.getElementById("theme-select").style.color = 'white';
                break;
            case "kobe":
                document.body.style.background = "#7A3516";
                break;
            case "castletongreen":
                document.body.style.background = "#005842";
                break;
            case "upmaroon":
                document.body.style.background = "#770BOE";
                break;
            default:
                document.body.style.background = "#FFFFFF";
                break;
        }
    };

    const handleThemeFontColorChange = (event) => {
        setColor(event.target.value);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleProfilePicChange = (event) => {
        setProfilePic(event.target.files[0]);
    };

    const handleWorkExperienceChange = (index, key, value) => {
        const updatedWorkExperience = [...workExperience];
        updatedWorkExperience[index][key] = value;
        setWorkExperience(updatedWorkExperience);
    };

    const handleAddWorkExperience = () => {
        setWorkExperience([
            ...workExperience,
            { jobTitle: "", company: "", employmentPeriod: "" },
        ]);
    };

    const handleRemoveWorkExperience = (index) => {
        const updatedWorkExperience = [...workExperience];
        updatedWorkExperience.splice(index, 1);
        setWorkExperience(updatedWorkExperience);
    };

    const handleEducationChange = (index, key, value) => {
        const updatedEducation = [...education];
        updatedEducation[index][key] = value;
        setEducation(updatedEducation);
    };

    const handleAddEducation = () => {
        setEducation([
            ...education,
            { degree: "", institution: "", completionDate: "" },
        ]);
    };

    const handleRemoveEducation = (index) => {
        const updatedEducation = [...education];
        updatedEducation.splice(index, 1);
        setEducation(updatedEducation);
    };

    // Themes Color and Font Color Tables
    function MyTable1({ color }) {
        var themeFontColor;
        switch (color) {
            case "white":
                themeFontColor = [255, 255, 255];
                break;
            case "black":
                themeFontColor = [0, 0, 0];
                break;
            default:
                themeFontColor = [255, 255, 255]; // default color
        }
    }
    function MyTable({ theme }) {
        var color = [255, 255, 255]; // default text color
        // console.log(theme)

        // set theme color based on selected theme
        var themeColor;
        switch (theme) {
            case "jet":
                themeColor = [42, 45, 49];
                break;
            case "slategray":
                themeColor = [108, 127, 147];
                break;
            case "darkseagreen":
                themeColor = [144, 174, 133];
                break;
            case "bronze":
                themeColor = [205, 133, 63];
                break;
            default:
                themeColor = [23, 165, 137]; // default theme
        }

    }

    // PDF generator Function
    const generatePdf = () => {

        const doc = new jspdf();
        var linkUrl = "https://github.com/JiyauddinSaiyad";


        // Profile Pic
        const imageData = profilePic ? URL.createObjectURL(profilePic) : null;
        doc.setFontSize(28);
        doc.text(name, 50, 30, 0, 36);
        doc.setFontSize(18);
        // Profile Image at Top Right
        if (imageData) {
            doc.addImage(imageData, "PNG", 15, 15, 30, 30); // set x=15 and y=15 for top left corner
        }



        // Email , Phone Number & Address to the right Top
        doc.text(email, doc.internal.pageSize.getWidth() - 10 - doc.getStringUnitWidth(email) * 5 - 5, 25);
        // add the phone number below the email with some space
        doc.text(phone, doc.internal.pageSize.getWidth() - 10 - doc.getStringUnitWidth(phone) * 5 - 5, 5 + doc.internal.getLineHeight() + 12);
        // add the address below the phone number with some space
        doc.text(address, doc.internal.pageSize.getWidth() - 10 - doc.getStringUnitWidth(address) * 5 - 5, 5 + doc.internal.getLineHeight() + 22);
        // Bottom Right Logo
        // doc.addImage(logo, 'PNG', doc.internal.pageSize.getWidth() - 30, doc.internal.pageSize.getHeight() - 25, 20, 20, { url: linkUrl });



        // PROFESSIONAL SUMMARY
        doc.autoTable({
            startY: 60,
            head: [["PROFESSIONAL SUMMARY"]],
            body: [[about]],
            headStyles: {
                fillColor: theme,
                textColor: color,
            },
            didDrawCell: (data) => {
                // add borders to the table cells
                doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, "S");
            },
        });




        // Education section
        doc.setFontSize(20);
        doc.text("Education", 15, 102);
        // create data and headers for autoTable
        const educationData = education.map((edu) => {
            const { degree, institution, completionDate } = edu;
            return [degree, institution, completionDate];
        });
        const educationHeaders = ["Degree", "Institution", "Completion Date"]
        // generate table using autoTable
        doc.autoTable({
            startY: 104,
            head: [educationHeaders],
            body: educationData,
            headStyles: {
                fillColor: theme,
                textColor: color,
            },
            didDrawCell: (data) => {
                // add borders to the table cells
                doc.rect(
                    data.cell.x,
                    data.cell.y,
                    data.cell.width,
                    data.cell.height,
                    "S"
                );
            },
        });



        // Work experience section
        doc.setFontSize(20);
        doc.text("Work Experience", 15, 140);
        // create data and headers for autoTable
        const workExperienceData = workExperience.map((exp) => {
            const { company, jobTitle, startDate, endDate } = exp;
            return [company, jobTitle, startDate, endDate];
        });
        const workExperienceHeaders = ["Company", "Title", "Start Date", "End Date"];
        // generate table using autoTable
        doc.autoTable({
            startY: 150,
            head: [workExperienceHeaders],
            body: workExperienceData,
            headStyles: {
                fillColor: theme, // set header color to red
                textColor: color,
            },
            didDrawCell: (data) => {
                // add borders to the table cells
                doc.rect(
                    data.cell.x,
                    data.cell.y,
                    data.cell.width,
                    data.cell.height,
                    "S"
                );
            },
        });

        // Bottom Right Logo Text
        doc.setFontSize(15);
        doc.setTextColor(theme);
        // set the border color to gray and width to 0.5
        doc.setDrawColor(128, 128, 128);
        doc.setLineWidth(2);
        // set the link text and URL
        var linkText = "JResume";
        // get the width of the link text
        var linkWidth = doc.getStringUnitWidth(linkText) * 12;
        // set the position of the link
        var xPos = doc.internal.pageSize.getWidth() - linkWidth - -22;
        var yPos = doc.internal.pageSize.getHeight() - 13;
        // add the link to the PDF
        doc.textWithLink(linkText, xPos, yPos, { url: linkUrl });

        // Generate PDF
        doc.save("resume.pdf");
        const dataUrl = doc.output("dataurlstring");
        setPdfDataUrl(dataUrl);
    };



    return (
        <div className="ResumeBuilder">
            <div className="mainLogoHeadDiv">
                <img className="mainlogoHead" src={mainLogo} /><h1>Resume Builder</h1>
            </div>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={handlePhoneChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="Enter address"
                        value={address}
                        onChange={handleAddressChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="profilePic" className="custom-file-upload">Profile Picture:</label>
                    <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        className="form-control-file"
                        id="profilePic"
                        onChange={handleProfilePicChange}
                    />
                    <img src={profilePic ? URL.createObjectURL(profilePic) : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'} alt="profile" id="prImg" />
                </div>
                <div className="form-group">
                    <label htmlFor="about">About You:</label>
                    <textarea
                        type="text"
                        className="form-control"
                        id="about"
                        placeholder="Write Something Good About You!"
                        value={about}
                        onChange={handleAboutChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="workExperience">Work Experience:</label>
                    {workExperience.map((exp, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter job title"
                                value={exp.jobTitle}
                                onChange={(event) =>
                                    handleWorkExperienceChange(
                                        index,
                                        "jobTitle",
                                        event.target.value
                                    )
                                }
                            />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter company name"
                                value={exp.company}
                                onChange={(event) =>
                                    handleWorkExperienceChange(
                                        index,
                                        "company",
                                        event.target.value
                                    )
                                }
                            />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Start Date"
                                value={exp.startdate}
                                onChange={(event) =>
                                    handleWorkExperienceChange(
                                        index,
                                        "startDate",
                                        event.target.value
                                    )
                                }
                            />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter End Date"
                                value={exp.enddate}
                                onChange={(event) =>
                                    handleWorkExperienceChange(
                                        index,
                                        "endDate",
                                        event.target.value
                                    )
                                }
                            />
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => handleRemoveWorkExperience(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleAddWorkExperience}
                    >
                        Add Work Experience
                    </button>
                </div>
                <div className="form-group">
                    <label htmlFor="education">Education:</label>
                    {education.map((edu, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter degree"
                                value={edu.degree}
                                onChange={(event) =>
                                    handleEducationChange(
                                        index,
                                        "degree",
                                        event.target.value
                                    )
                                }
                            />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter institution"
                                value={edu.institution}
                                onChange={(event) =>
                                    handleEducationChange(
                                        index,
                                        "institution",
                                        event.target.value
                                    )
                                }
                            />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter completion date"
                                value={edu.completionDate}
                                onChange={(event) =>
                                    handleEducationChange(
                                        index,
                                        "completionDate",
                                        event.target.value
                                    )
                                }
                            />
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => handleRemoveEducation(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleAddEducation}
                    >
                        Add Education
                    </button>
                </div>
                <div className="form-group">
                    <label htmlFor="theme-select">Select Theme:</label>
                    <select id="theme-select" value={theme} onChange={handleThemeChange}>
                        <option value="jet">Jet</option>
                        <option value="slategray">Slate Gray</option>
                        <option value="darkseagreen">Dark Sea Green</option>
                        <option value="bronze">Bronze</option>
                    </select>
                    <label htmlFor="color-select">Select Font color:</label>
                    <select id="color-select" value={color} onChange={handleThemeFontColorChange}>
                        <option value="white">Default</option>
                        <option value="black">Black</option>
                    </select>
                    {/* render tables with selected theme */}
                    <MyTable theme={theme} />
                    <MyTable1 color={color} />
                </div>
            </form >
            {/* <div className="resume">
                <h2>{name}</h2>
                <img src={profilePic ? URL.createObjectURL(profilePic) : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'} alt="profile" id="prImg" />
                <p>{email}</p>
                <p>{phone}</p>
                <p>{address}</p>
                <p>{about}</p>
                <p>{prDeg} - {prUni} - {prGy} </p>
                <p>{prComp} - {prJt} - {prStart} - {prEnd}</p>
                <div className="logoDiv">
                    <img className="logojrs" src={logo}></img>
                </div>
            </div> */}
            <div className="resume">
                <h2>{name}</h2>
                <img src={profilePic ? URL.createObjectURL(profilePic) : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'} alt="profile" id="prImg" />
                <div>
                    <p>{email}</p>
                    <p>{phone}</p>
                    <p>{address}</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Degree</th>
                            <th>University</th>
                            <th>Graduation Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{prDeg}</td>
                            <td>{prUni}</td>
                            <td>{prGy}</td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Job Title</th>
                            <th>Start Year</th>
                            <th>End Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{prComp}</td>
                            <td>{prJt}</td>
                            <td>{prStart}</td>
                            <td>{prEnd}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="logoDiv">
                    <img className="logojrs" src={mainLogo}></img>
                </div>
            </div>

            <button className="dwnBtn" onClick={generatePdf}><FaDownload className="dwnIco" /></button>
        </div >
    );
}


export default ResumeBuilder;
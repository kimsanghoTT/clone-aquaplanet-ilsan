import React from "react";
import { ecoManagementPolicies, activities } from "../data/data";

const PlanetContent03 = () => {
    return(
        <div className="planet-content-box content-03">
            <div className="center-content">
                <div className="content-title">
                    <h2>환경경영</h2>
                </div>
                <div className="text-box">
                    <p>환경경영이란?</p>
                    <p>
                        환경경영이란 기존의 경영 분야에 환경이라고 하는 분야를 추가하여 경영적 개념을 도입하는 것으로 환경 관리를 기업 경영의 방침으로 삼고 기업 활동이 환경에 미치는 부정적인 영향을 최소화하면서 환경적으로 건전하고 지속 가능한 발전을 도모하는 경영철학을 말합니다.
                    </p>
                </div>
                <div className="table-box">
                    <table>
                        <caption>
                            <span>아쿠아플라넷 일산 환경경영 방침</span>
                            <span>환경경영 협약 체결</span>
                        </caption>
                        <colgroup>
                            <col width="50%"/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th><span>아쿠아플라넷 일산 환경경영 방침</span></th>
                                <th><span>환경경영 협약 체결</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <ul>
                                    {ecoManagementPolicies.principles.map((principle, index) => (
                                        <li className="bullet" key={index}>{principle}</li>
                                    ))}
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                    {ecoManagementPolicies.achievements.map((achievement, index) => (
                                        <li className="bullet" key={index}>{achievement}</li>
                                    ))}
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="ilsan-activity">
                    <p>환경경영 자발적 활동</p>
                    {activities.map(activity => (
                        <div className="activity" key={activity.id}>
                            <p className="activity-title">{activity.activity}</p>
                            {activity.description.map((desc, index) => (
                                <p className="bullet" key={index}>{desc}</p>
                            ))}
                            <ul className="activity-img-box">
                                {activity.images.map((img, index) => (
                                    <img key={index} src={img} alt={img}/>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default PlanetContent03;
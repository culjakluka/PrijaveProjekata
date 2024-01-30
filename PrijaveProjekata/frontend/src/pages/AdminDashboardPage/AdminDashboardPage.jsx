import React from "react";
import styles from "./AdminDashboardPage.module.css"
import AdminDashboard from "../../components/AdminDashboard/AdminDashboard";

const AdminDashboardPage = () => {
    return (
        <>
            <div className={styles.AdminDashboardPageContainer}>
                <AdminDashboard />
            </div>
        </>
    )
}

export default AdminDashboardPage
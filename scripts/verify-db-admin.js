const { sequelize } = require('../hrm-backend/config/db');

async function checkDatabase() {
    try {
        console.log('Testing connection to ByetHost...');
        await sequelize.authenticate();
        console.log('✅ Database connection successful!');

        const [results] = await sequelize.query("SELECT id, email, role, first_name FROM users WHERE role = 'admin' OR role = 'HR' LIMIT 5");

        if (results.length > 0) {
            console.log('✅ Found Admin/HR users:');
            results.forEach(u => console.log(`   - ${u.first_name} (${u.email}) [${u.role}]`));
        } else {
            console.log('⚠️  No Admin users found. You may need to seed the database.');
        }

    } catch (error) {
        console.error('❌ Database check failed:', error.message);
    } finally {
        await sequelize.close();
    }
}

checkDatabase();

var utils = new (require('./../utils.js'))();

class Course {

  /**
   * Truncate the course table and test insertions
   */
  async start(connection) {
    this.connection = connection;

    try {
      await this.truncate();
      await this.insertCourses();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Truncate the course table so we while performing insertions
   * we can correctly track the number of rows before and 
   * after the insertions.
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.course;"
      `, 'Truncated table course', 'Failed to truncate table course');
  }

  /**
   * Insert 5 courses and check if they're inserted by counting
   * the number of rows before and after the insertion of courses.
   */
  async insertCourses() {
    try {
      var rowsCount;

      await this.connection.query('SELECT * FROM projectary_tests.course;', await function (error, results, fields) {
        rowsCount = results.length;
      });

      // mysqltest
      try {
        await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/tables/insertCourses.sql`);
      } catch (error) {
        throw new Error(error);
      }

      await this.connection.query('SELECT * FROM projectary_tests.course;', await function (error, results, fields) {
        if (rowsCount + 5 == results.length) {
          utils.log('success', 'Inserted 5 courses successfully');
        } else {
          utils.log('fail', 'The number of rows before and after the insertion do not match');
        }
      });
    } catch (error) {
      utils.log('fail', 'Failed to insert courses \n' + error);
      return;
    }
  }
}

module.exports = Course;

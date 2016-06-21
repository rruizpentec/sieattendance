/**
 * Toggle user attendance information into SIE Platform
 *
 * @param action Action to perform
 * @param courseid Course id
 * @param aluid User id
 * @param attdate Attendance date
 */
function block_sieattendance_toggle_sie_user_attendance(action, courseid, aluid, attdate) {
    $.ajax({
        url: M.cfg.wwwroot + '/blocks/sieattendance/requests.php',
        type: 'POST',
        async: true,
        data: {action: action, alu_id: aluid, course_id: courseid, asi_fecha: attdate},
        success: function(response)
        {
            try
            {
                console.log(response);
                if (response == 'OK') {
                    if (aluid == block_sieattendance_userid && action == 'setAttendance') {
                        window.location = window.location;
                        location.reload(true);
                    } else {
                        var increment = (action == 'setAttendance' ? 1 : -1);
                        var status = (action == 'setAttendance' ? 'ok' : 'fail');
                        block_sieattendance_update_user_attendance_data(aluid, status, increment);
                    }
                } else {
                    console.log('Response error');
                }
                return;
            }
            catch(ex)
            {
                console.log('AJAX error in request: ' + ex);
            }
        },
        error: function(jqXHR, description, ex)
        {
            console.log('block_sieattendance_set_user_attendance: ' + description + ' ' + jqXHR.responseText);
            debugObj = jqXHR;
            var err = eval('(' + jqXHR.responseText + ')');
            console.log(err.Message);
        }
    });
}

/**
 * Toggle user attendance information
 *
 * @param int $courseid Course id
 * @param int $aluid User id
 * @param $attdate Attendance date
 */
function block_sieattendance_toggle_user_attendance(courseid, aluid, attdate) {
    var action = 'setAttendance';
    if ($('#block_sieattendance_toggleUserAttendance' + aluid).attr('value') == 'ok') {
        action = 'delAttendance';
    }
    block_sieattendance_toggle_sie_user_attendance(action, courseid, aluid, attdate);
}

function block_sieattendance_update_user_attendance_data(aluid, status, increment) {
    $('#block_sieattendance_toggleUserAttendance' + aluid)
        .attr('src', M.cfg.wwwroot + '/blocks/sieattendance/pix/' + status + '.png')
        .attr('value', status);
    var userAttendance = parseInt($('#studentAttendance' + aluid).val());
    $('#studentAttendance' + aluid).val(userAttendance + increment);
    var courseAttendance = parseInt($('#courseCountAttendance').val());
    var assistPercentage = (((userAttendance + increment) * 100) / courseAttendance);
    $('#percentage' + aluid).text((assistPercentage).toFixed(2) + ' %');
}

/**
 * Returns today date formatted as YYYY-MM-DD
 */
function getToday() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = yyyy + '-' + mm + '-' + dd;
    return today;
}
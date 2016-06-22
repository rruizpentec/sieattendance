// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Version details.
 *
 * @package    block_sieattendance
 * @copyright  2015 Planificacion de Entornos Tecnologicos SL
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module block_sieattendance/sieattendance
 */
define(['jquery'], function($) {
    /**
     * @constructor
     * @alias module:block_sieattendance/sieattendance
     */

    /**
     * Updates user attendance data inside the block
     *
     * @param aluid User id
     * @param status Status flag for user attendance
     * @param increment The amount of attendance to increment
     */
    function update_user_attendance_data1 (aluid, status, increment) {
        console.log('update_user_attendance_data');
        /*
        $('#block_sieattendance_toggleUserAttendance' + aluid)
            .attr('src', M.cfg.wwwroot + '/blocks/sieattendance/pix/' + status + '.png')
            .attr('value', status);
        var userAttendance = parseInt($('#studentAttendance' + aluid).val());
        $('#studentAttendance' + aluid).val(userAttendance + increment);
        var courseAttendance = parseInt($('#courseCountAttendance').val());
        var assistPercentage = (((userAttendance + increment) * 100) / courseAttendance);
        $('#percentage' + aluid).text((assistPercentage).toFixed(2) + ' %');
        */
    }

    /**
     * Toggle user attendance information on SAMIE platform
     *
     * @param int $courseid Course id
     * @param int $aluid User id
     * @param $attdate Attendance date
     */
    function toggle_sie_user_attendance1 (action, courseid, aluid, attdate) {
        console.log('toggle_sie_user_attendance');
        /*
        $.ajax({
            url: M.cfg.wwwroot + '/blocks/sieattendance/requests.php',
            type: 'POST',
            async: true,
            data: {action: action, alu_id: aluid, course_id: courseid, asi_fecha: attdate},
            success: function(response) {
                try {
                    if (response == 'OK') {
                        if (aluid == block_sieattendance_userid && action == 'setAttendance') {
                            window.location = window.location;
                            location.reload(true);
                        } else {
                            var increment = (action == 'setAttendance' ? 1 : -1);
                            var status = (action == 'setAttendance' ? 'ok' : 'fail');
                            update_user_attendance_data(aluid, status, increment);
                        }
                    }
                    return;
                } catch(ex) { }
            },
            error: function(jqXHR, description) {
                // Debug: console.log('block_sieattendance_set_user_attendance: ' + description + ' ' + jqXHR.responseText);.
                var err = eval('(' + jqXHR.responseText + ')');
                // Debug: console.log(err.Message);.
            }
        });*/
    }

    /**
     * Toggle user attendance information
     *
     * @param int $courseid Course id
     * @param int $aluid User id
     * @param $attdate Attendance date
     */
    function toggle_user_attendance1 (courseid, aluid, attdate) {
        console.log('toggle_user_attendance');
        /*
        var action = 'setAttendance';
        if ($('#block_sieattendance_toggleUserAttendance' + aluid).attr('value') == 'ok') {
            action = 'delAttendance';
        }
        toggle_sie_user_attendance(action, courseid, aluid, attdate);
        */
    }

    return {
        toggle_sie_user_attendance: function () {
            alert('olakease1');
        },
        toggle_user_attendance: function () {
            alert('olakease2');
        }
    };
});
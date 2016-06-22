<?php
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
 * A Moodle block for controlling the students attendance
 *
 * @package    SIE
 * @copyright  2015 Planificacion de Entornos Tecnologicos SL
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

require_once(__DIR__ .'/lib.php');

define('BLOCK_SIEATTENDANCE_GRADEBOOK_ITEM_NAME', 'Attendance');
/**
 * Block sieattendance class.
 *
 * This block can be added to a course page to display of
 * list of students for a course. This block allow to call roll
 * from a date and add it to grade book course.
 *
 * @package    SIE
 * @copyright  2015 Planificacion de Entornos Tecnologicos SL
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class block_sieattendance extends block_base {

    /**
     * Core function used to initialize the block.
     *
     * @return void
     */
    public function init() {
        $this->title = get_string('title', 'block_sieattendance');
    }

    /**
     * Used to generate the content for the block.
     *
     * @return string
     */
    public function get_content() {
        global $CFG, $COURSE, $DB, $PAGE, $USER;
        $coursecontext = context_course::instance($COURSE->id);
        if (!has_capability('block/sieattendance:roll', $coursecontext, $USER, true)) {
            return null;
        }

        if (isset($this->content)) {
            if ($this->content !== null) {
                return $this->content;
            }
        } else {
            $this->content = new stdClass();
            $this->content->text = '';
        }

        if ($PAGE->pagelayout != 'course') {
            $courseid = optional_param('courseid', null, PARAM_INT);
            if ($courseid != null) {
                $this->content->text = html_writer::tag('a', get_string('gobacktocourse', 'block_sieattendance'),
                        array(
                            'href' => $CFG->wwwroot."/course/view.php?id=$courseid",
                            'class' => 'btn btn-default block_sieattendance_button')
                );
                $this->content->text .= self::get_show_attendances_buttons($courseid);
            } else {
                $this->content->text = get_string('accesstocoursemessage', 'block_sieattendance');
            }
            return null;
        }

        $PAGE->requires->js_call_amd('block_sieattendance/sieattendance', 'init', array($USER->id));
        $today = strftime('%Y%m%d', date_timestamp_get(date_create()));

        $filter = "teacherid = userid AND timedate = ".$today." AND courseid = ".$COURSE->id;
        $callroll = $DB->count_records_select('sieattendance', $filter, null, "COUNT('id')");
        if ($callroll == 0) { // Not attended today, then show a button.
            $onclickcode = "(function() {
                require('block_sieattendance/sieattendance')
                    .toggle_sie_user_attendance('setAttendance', ".$COURSE->id.", ".$USER->id.", ".$today.")
            })();";
            $out .= html_writer::tag('span', get_string('callroll', 'block_sieattendance'),
                    array(
                        'onclick' => $onclickcode,
                        'class'   => 'btn btn-default block_sieattendance_button'));
        } else {
            $out .= block_sieattendance_print_attendance_table($COURSE->id, $today);
            $out .= '<br>';
        }
        $out .= self::get_show_attendances_buttons($COURSE->id);
        $this->content->text .= $out;
        return $this->content;
    }

    /**
     *
     */
    private static function get_show_attendances_buttons($courseid) {
        global $CFG;
        $result = html_writer::tag('a', get_string('showallattendance', 'block_sieattendance'),
                array(
                    'href'  => $CFG->wwwroot.'/blocks/sieattendance/showattendances.php?courseid='.$courseid,
                    'class' => 'btn btn-default block_sieattendance_button')
        );
        $result .= html_writer::tag('a', get_string('addtogradebook', 'block_sieattendance'),
                array(
                    'href'  => $CFG->wwwroot.'/blocks/sieattendance/addtogradebook.php?courseid='.$courseid,
                    'class' => 'btn btn-default block_sieattendance_button')
        );
        return $result;
    }

    /**
     * Core function, specifies where the block can be used.
     *
     * @return array
     */
    public function applicable_formats() {
        return array(
            'all'                => true,
            'site'               => true,
            'site-index'         => true,
            'course-view'        => true,
            'course-view-social' => false,
            'mod'                => true,
            'mod-quiz'           => false);
    }

    /**
     * Allows the block to be added multiple times to a single page
     *
     * @return bool
     */
    public function instance_allow_multiple() {
          return false;
    }

    /**
     * This line tells Moodle that the block has a settings.php file.
     *
     * @return bool
     */
    public function has_config() {
        return false;
    }
}

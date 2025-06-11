$(document).ready(function() {
    // متغیرها
    let attendees = [];
    let decisions = [];
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    let sessions = JSON.parse(localStorage.getItem('sessions')) || [];
    let currentSessionId = null;
    const password = 'admin123';

    // تنظیمات i18next
    i18next.init({
        lng: localStorage.getItem('language') || 'fa',
        resources: {
            fa: {
                translation: {
                    sessions: 'صورتجلسات',
                    new_session: 'جلسه جدید',
                    contacts: 'مخاطبین',
                    archive: 'آرشیو',
                    dashboard: 'Dashboard',
                    settings: 'تنظیمات',
                    session_form: 'فرم ثبت صورتجلسه',
                    session_info: 'اطلاعات جلسه',
                    session_number: 'شماره جلسه',
                    session_number_placeholder: 'شماره جلسه را وارد کنید',
                    session_date: 'تاریخ',
                    start_time: 'ساعت شروع',
                    end_time: 'ساعت پایان',
                    session_title: 'عنوان جلسه',
                    session_title_placeholder: 'عنوان جلسه را وارد کنید',
                    location: 'مکان',
                    select_location: 'انتخاب کنید',
                    manual_location: 'وارد کردن دستی',
                    location_manual: 'مکان را وارد کنید',
                    organizer: 'برگزارکننده',
                    organizer_placeholder: 'نام برگزارکننده را وارد کنید',
                    session_files: 'فایل‌های مرتبط',
                    attendees: 'شرکت‌کنندگان',
                    attendee_name: 'نام',
                    attendee_name_placeholder: 'نام شرکت‌کننده',
                    attendee_mobile: 'موبایل',
                    mobile_placeholder: 'شماره موبایل (اختیاری)',
                    add: 'افزودن',
                    decisions: 'مصوبات',
                    decision_text: 'مصوبه',
                    decision_text_placeholder: 'متن مصوبه را وارد کنید',
                    decision_responsible: 'مسئول',
                    decision_responsible_placeholder: 'نام مسئول',
                    decision_due_date: 'مهلت',
                    decision_status: 'وضعیت',
                    in_progress: 'در حال انجام',
                    completed: 'تکمیل شده',
                    canceled: 'لغو',
                    notes: 'یادداشت‌ها',
                    notes_placeholder: 'یادداشت‌های جلسه را وارد کنید',
                    save: 'ذخیره',
                    pdf: 'دانلود PDF',
                    excel: 'اکسل',
                    whatsapp: 'واتساپ',
                    calendar: 'تقویم',
                    share: 'اشتراک',
                    row: 'ردیف',
                    action: 'عملیات',
                    add_contact: 'افزودن مخاطب جدید',
                    contact_name: 'نام',
                    contact_name_placeholder: 'نام مخاطب را وارد کنید',
                    contact_mobile: 'موبایل',
                    import_contacts: 'وارد کردن مخاطبان',
                    contacts_list: 'لیست مخاطبان',
                    search_contacts: 'جستجوی مخاطب',
                    search_contacts_placeholder: 'نام یا موبایل مخاطب را جستجو کنید',
                    add_selected: 'افزودن انتخاب‌شده‌ها به جلسه',
                    archive_list: 'لیست جلسات',
                    search_sessions: 'جستجوی جلسه',
                    search_sessions_placeholder: 'شماره یا عنوان جلسه را جستجو کنید',
                    dashboard_welcome: 'به داشبورد خوش آمدید! در حال حاضر این بخش در حال توسعه است.',
                    general_settings: 'تنظیمات عمومی',
                    theme: 'انتخاب تم',
                    light_theme: 'روشن',
                    dark_theme: 'تیره',
                    font_family: 'فونت',
                    theme_color: 'رنگ قالب',
                    font_size: 'اندازه فونت',
                    text_direction: 'جهت متن',
                    logo_size: 'اندازه لوگو',
                    contacts_access: 'دسترسی به مخاطبان',
                    manage_access: 'مدیریت دسترسی',
                    reset_settings: 'بازنشانی تنظیمات',
                    session_settings: 'تنظیمات جلسات',
                    default_location: 'مکان پیش‌فرض',
                    default_organizer: 'برگزارکننده پیش‌فرض',
                    organizer_default_placeholder: 'نام برگزارکننده پیش‌فرض را وارد کنید',
                    auto_numbering: 'شماره‌گذاری خودکار',
                    session_template: 'قالب پیش‌فرض جلسه',
                    standard_template: 'استاندارد',
                    detailed_template: 'جزئیات کامل',
                    minimal_template: 'حداقل',
                    whatsapp_summary: 'خلاصه جلسه برای واتساپ',
                    select_attendees: 'انتخاب شرکت‌کنندگان برای ارسال',
                    send_whatsapp: 'ارسال',
                    close: 'بستن',
                    enter_password: 'رمز عبور را وارد کنید',
                    password_placeholder: 'رمز عبور',
                    confirm: 'تأیید',
                    cancel: 'لغو',
                    success_save: 'با موفقیت ذخیره شد',
                    error_required: 'فیلد ضروری است',
                    error_invalid_mobile: 'شماره موبایل نامعتبر است',
                    error_duplicate_contact: 'مخاطب قبلاً وجود دارد',
                    error_invalid_date: 'تاریخ نامعتبر است',
                    error_invalid_time: 'ساعت نامعتبر است'
                }
            },
            en: {
                translation: {
                    sessions: 'Meeting Minutes',
                    new_session: 'New Meeting',
                    contacts: 'Contacts',
                    archive: 'Archive',
                    dashboard: 'Dashboard',
                    settings: 'Settings',
                    session_form: 'Meeting Minutes Form',
                    session_info: 'Meeting Information',
                    session_number: 'Meeting Number',
                    session_number_placeholder: 'Enter meeting number',
                    session_date: 'Date',
                    start_time: 'Start Time',
                    end_time: 'End Time',
                    session_title: 'Meeting Title',
                    session_title_placeholder: 'Enter meeting title',
                    location: 'Location',
                    select_location: 'Select',
                    manual_location: 'Manual Entry',
                    location_manual: 'Enter location',
                    organizer: 'Organizer',
                    organizer_placeholder: 'Enter organizer name',
                    session_files: 'Related Files',
                    attendees: 'Attendees',
                    attendee_name: 'Name',
                    attendee_name_placeholder: 'Attendee name',
                    attendee_mobile: 'Mobile',
                    mobile_placeholder: 'Mobile number (optional)',
                    add: 'Add',
                    decisions: 'Decisions',
                    decision_text: 'Decision',
                    decision_text_placeholder: 'Enter decision text',
                    decision_responsible: 'Responsible',
                    decision_responsible_placeholder: 'Responsible person',
                    decision_due_date: 'Due Date',
                    decision_status: 'Status',
                    in_progress: 'In Progress',
                    completed: 'Completed',
                    canceled: 'Canceled',
                    notes: 'Notes',
                    notes_placeholder: 'Enter meeting notes',
                    save: 'Save',
                    pdf: 'Download PDF',
                    excel: 'Excel',
                    whatsapp: 'WhatsApp',
                    calendar: 'Calendar',
                    share: 'Share',
                    row: 'Row',
                    action: 'Actions',
                    add_contact: 'Add New Contact',
                    contact_name: 'Name',
                    contact_name_placeholder: 'Enter contact name',
                    contact_mobile: 'Mobile',
                    import_contacts: 'Import Contacts',
                    contacts_list: 'Contacts List',
                    search_contacts: 'Search Contacts',
                    search_contacts_placeholder: 'Search by name or mobile',
                    add_selected: 'Add Selected to Meeting',
                    archive_list: 'Meetings List',
                    search_sessions: 'Search Meetings',
                    search_sessions_placeholder: 'Search by number or title',
                    dashboard_welcome: 'Welcome to Dashboard! This section is currently under development.',
                    general_settings: 'Employee Settings',
                    theme: 'Select Theme',
                    light_theme: 'Light',
                    dark_theme: 'Dark',
                    font_family: 'Font',
                    theme_color: 'Theme Color',
                    font_size: 'Font Size',
                    text_direction: 'Text Direction',
                    logo_size: 'Logo Size',
                    contacts_access: 'Contacts Access',
                    manage_access: 'Manage Access',
                    reset_settings: 'Reset Settings',
                    session_settings: 'Meeting Settings',
                    default_location: 'Default Location',
                    default_organizer: 'Default Organizer',
                    organizer_default_placeholder: 'Enter default organizer name',
                    auto_numbering: 'Provide Auto Numbering',
                    session_template: 'Meeting Template',
                    standard_template: 'Standard Template',
                    detailed_template: 'Detailed',
                    minimal_template: 'Minimal',
                    whatsapp_summary: 'Meeting Summary for WhatsApp',
                    select_attendees: 'Select Attendees to Send',
                    send_whatsapp: 'Send',
                    close: 'Close',
                    enter_password: 'Enter Password',
                    password_placeholder: 'Password',
                    confirm: 'Confirm',
                    cancel: 'Cancel',
                    success_save: 'Saved successfully',
                    error_required: 'Field is required',
                    error_invalid_mobile: 'Invalid mobile number',
                    error_duplicate_contact: 'Contact already exists',
                    error_invalid_date: 'Invalid date',
                    error_invalid_time: 'Invalid time'
                }
            }
        }
    }, () => {
        updateTranslations();
    });

    // تابع بروزرسانی ترجمه‌ها
    function updateTranslations() {
        $('[data-i18n]').each(function() {
            const key = $(this).data('i18n');
            $(this).text(i18next.t(key));
        });
        $('[data-i18n-placeholder]').each(function() {
            const key = $(this).data('i18n-placeholder');
            $(this).attr('placeholder', i18next.t(key));
        });
    }

    // تغییر زبان
    $('#language-toggle').on('click', () => {
        const newLang = i18next.language === 'fa' ? 'en' : 'fa';
        i18next.changeLanguage(newLang, () => {
            localStorage.setItem('language', newLang);
            $('#lang-display').text(newLang);
            updateTranslations();
            moment.locale(newLang === 'fa' ? 'fa' : 'en');
            $('.date-picker').each(function() {
                $(this).val('');
            });
        });
    });

    // تنظیم تقویم شمسی/میلادی
    moment.locale('fa');
    $('.date-picker').each(function() {
        $(this).on('click', function() {
            $(this).datepicker('destroy').datepicker({
                dateFormat: i18next.language === 'fa' ? 'yy/mm/dd' : 'mm/dd/yy',
                changeMonth: true,
                changeYear: true,
                showButtonPanel: true,
                isRTL: i18next.language === 'fa',
                beforeShow: function(input, inst) {
                    inst.dpDiv.css({ fontFamily: "'Vazir', sans-serif" });
                }
            }).datepicker('show');
        });
    });

    // مدیریت منوی موبایل
    $('#menu-toggle').on('click', () => {
        $('.sidebar').toggleClass('active');
        $('.bottom-nav').toggleClass('active');
    });

    // مدیریت ناوبری
    function showView(viewId) {
        $('.form-container').hide();
        $(`#${viewId}`).show();
        $('.sidebar a, .bottom-nav a').removeClass('active');
        $(`#nav-${viewId.replace('-view', '')}, #nav-${viewId.replace('-view', '')}-mobile`).addClass('active');
    }

    $('.sidebar a, .bottom-nav a').on('click', function(e) {
        e.preventDefault();
        const viewId = $(this).attr('id').replace('nav-', '').replace('-mobile', '') + '-view';
        showView(viewId);
    });

    // مدیریت مکان دستی
    $('#location').on('change', function() {
        if ($(this).val() === 'manual') {
            $('#location-manual').show().focus();
        } else {
            $('#location-manual').hide().val('');
        }
    });

    // اعتبارسنجی شماره موبایل
    function validateMobile(mobile) {
        const regex = i18next.language === 'fa' ? /^09[0-9]{9}$/ : /^\+?[1-9][0-9]{7,14}$/;
        return mobile ? regex.test(mobile) : true;
    }

    // افزودن شرکت‌کننده
    $('#add-attendee').on('click', () => {
        const name = $('#attendee-name').val().trim();
        const mobile = $('#attendee-mobile').val().trim();
        if (!name) {
            showToast(i18next.t('error_required'), 'error');
            $('#attendee-name').addClass('error').focus();
            return;
        }
        if (mobile && !validateMobile(mobile)) {
            showToast(i18next.t('error_invalid_mobile'), 'error');
            $('#attendee-mobile').addClass('error').focus();
            return;
        }
        attendees.push({ name, mobile });
        updateAttendeesTable();
        $('#attendee-name, #attendee-mobile').val('').removeClass('error');
        showToast(i18next.t('success_save'), 'success');
    });

    // بروزرسانی جدول شرکت‌کنندگان
    function updateAttendeesTable() {
        const tbody = $('#attendees-table tbody').empty();
        attendees.forEach((attendee, index) => {
            tbody.append(`
                <tr>
                    <td>${index + 1}</td>
                    <td>${attendee.name}</td>
                    <td>${attendee.mobile || '-'}</td>
                    <td>
                        <button class="btn btn-danger btn-sm delete-attendee" data-index="${index}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `);
        });
    }

    // حذف شرکت‌کننده
    $(document).on('click', '.delete-attendee', function() {
        const index = $(this).data('index');
        attendees.splice(index, 1);
        updateAttendeesTable();
        showToast(i18next.t('success_save'), 'success');
    });

    // افزودن مصوبه
    $('#add-decision').on('click', () => {
        const text = $('#decision-text').val().trim();
        const responsible = $('#decision-responsible').val().trim();
        const dueDate = $('#decision-date').val();
        const status = $('#decision-status').val();
        if (!text) {
            showToast(i18next.t('error_required'), 'error');
            $('#decision-text').addClass('error').focus();
            return;
        }
        decisions.push({ text, responsible, dueDate, status });
        updateDecisionsTable();
        $('#decision-text, #decision-responsible, #decision-date').val('').removeClass('error');
        $('#decision-status').val('in_progress');
        showToast(i18next.t('success_save'), 'success');
    });

    // بروزرسانی جدول مصوبات
    function updateDecisionsTable() {
        const tbody = $('#decisions-table tbody').empty();
        decisions.forEach((decision, index) => {
            tbody.append(`
                <tr>
                    <td>${index + 1}</td>
                    <td>${decision.text}</td>
                    <td>${decision.responsible || '-'}</td>
                    <td>${decision.dueDate || '-'}</td>
                    <td>${i18next.t(decision.status)}</td>
                    <td>
                        <button class="btn btn-danger btn-sm delete-decision" data-index="${index}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `);
        });
    }

    // حذف مصوبه
    $(document).on('click', '.delete-decision', function() {
        const index = $(this).data('index');
        decisions.splice(index, 1);
        updateDecisionsTable();
        showToast(i18next.t('success_save'), 'success');
    });

    // ذخیره جلسه
    $('#save-button').on('click', () => {
        const session = {
            number: $('#session-number').val().trim(),
            date: $('#session-date').val(),
            startTime: $('#start-time').val(),
            title: $('#session-title').val().trim(),
            location: $('#location').val() === 'manual' ? $('#location-manual').val().trim() : $('#location').val(),
            organizer: $('#organizer').val().trim(),
            files: $('#session-files')[0].files.length,
            attendees: [...attendees],
            decisions: [...decisions],
            notes: $('#notes').val().trim(),
            id: currentSessionId || Date.now()
        };

        if (!session.number || !session.date || !session.startTime || !session.title || !session.location || !session.organizer) {
            showToast(i18next.t('error_required'), 'error');
            return;
        }

        const index = sessions.findIndex(s => s.id === session.id);
        if (index !== -1) {
            sessions[index] = session;
        } else {
            sessions.push(session);
        }

        localStorage.setItem('sessions', JSON.stringify(sessions));
        resetForm();
        updateArchiveTable();
        showToast(i18next.t('success_save'), 'success');
    });

    // ریست فرم
    function resetForm() {
        $('#session-number, #session-date, #start-time, #end-time, #session-title, #location-manual, #organizer, #notes').val('');
        $('#location').val('');
        $('#session-files').val('');
        attendees = [];
        decisions = [];
        updateAttendeesTable();
        updateDecisionsTable();
        currentSessionId = null;
        $('#location-manual').hide();
    }

    // تولید PDF
    $('#print-button').on('click', () => {
        const session = {
            number: $('#session-number').val().trim(),
            date: $('#session-date').val(),
            startTime: $('#start-time').val(),
            endTime: $('#end-time').val(),
            title: $('#session-title').val().trim(),
            location: $('#location').val() === 'manual' ? $('#location-manual').val().trim() : $('#location').val(),
            organizer: $('#organizer').val().trim(),
            attendees,
            decisions,
            notes: $('#notes').val().trim()
        };

        const element = document.createElement('div');
        element.innerHTML = `
            <div style="font-family: 'Vazir', sans-serif; direction: rtl; padding: 20px;">
                <h2 style="text-align: center; color: #7c3aed;">صورتجلسه شماره ${session.number}</h2>
                <p><strong>عنوان:</strong> ${session.title}</p>
                <p><strong>تاریخ:</strong> ${session.date}</p>
                <p><strong>ساعت شروع:</strong> ${session.startTime}</p>
                <p><strong>ساعت پایان:</strong> ${session.endTime || '-'}</p>
                <p><strong>مکان:</strong> ${session.location}</p>
                <p><strong>برگزارکننده:</strong> ${session.organizer}</p>
                <h3>شرکت‌کنندگان</h3>
                <ul>${session.attendees.map(a => `<li>${a.name} ${a.mobile ? `(${a.mobile})` : ''}</li>`).join('')}</ul>
                <h3>مصوبات</h3>
                <ul>${session.decisions.map(d => `<li>${d.text} (مسئول: ${d.responsible || '-'}, مهلت: ${d.dueDate || '-'}, وضعیت: ${i18next.t(d.status)})</li>`).join('')}</ul>
                <h3>یادداشت‌ها</h3>
                <p>${session.notes || '-'}</p>
            </div>
        `;

        html2pdf().from(element).set({
            margin: 10,
            filename: `session_${session.number}.pdf`,
            html2canvas: { scale: 2 },
            jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
        }).save();
    });

    // افزودن مخاطب
    $('#add-contact').on('click', () => {
        const name = $('#contact-name').val().trim();
        const mobile = $('#contact-mobile').val().trim();
        if (!name) {
            showToast(i18next.t('error_required'), 'error');
            $('#contact-name').addClass('error').focus();
            return;
        }
        if (mobile && !validateMobile(mobile)) {
            showToast(i18next.t('error_invalid_mobile'), 'error');
            $('#contact-mobile').addClass('error').focus();
            return;
        }
        if (contacts.some(c => c.name === name && c.mobile === mobile)) {
            showToast(i18next.t('error_duplicate_contact'), 'error');
            return;
        }
        contacts.push({ name, mobile });
        localStorage.setItem('contacts', JSON.stringify(contacts));
        updateContactsTable();
        $('#contact-name, #contact-mobile').val('').removeClass('error');
        showToast(i18next.t('success_save'), 'success');
    });

    // بروزرسانی جدول مخاطبان
    function updateContactsTable() {
        const tbody = $('#contacts-table tbody').empty();
        contacts.forEach((contact, index) => {
            tbody.append(`
                <tr>
                    <td><input type="checkbox" class="contact-checkbox" data-index="${index}"></td>
                    <td>${index + 1}</td>
                    <td>${contact.name}</td>
                    <td>${contact.mobile || '-'}</td>
                    <td>
                        <button class="btn btn-danger btn-sm delete-contact" data-index="${index}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `);
        });
    }

    // حذف مخاطب
    $(document).on('click', '.delete-contact', function() {
        $('#password-modal').addClass('active');
        $('#modal-overlay').addClass('active');
        const index = $(this).data('index');
        $('#submit-password-btn').off('click').on('click', () => {
            if ($('#password-input').val() === password) {
                contacts.splice(index, 1);
                localStorage.setItem('contacts', JSON.stringify(contacts));
                updateContactsTable();
                $('#password-modal, #modal-overlay').removeClass('active');
                $('#password-input').val('');
                showToast(i18next.t('success_save'), 'success');
            } else {
                showToast('رمز عبور نادرست است', 'error');
            }
        });
        $('#cancel-password-btn, #modal-overlay').on('click', () => {
            $('#password-modal, #modal-overlay').removeClass('active');
            $('#password-input').val('');
        });
    });

    // انتخاب همه مخاطبان
    $('#select-all-checkbox').on('change', function() {
        $('.contact-checkbox').prop('checked', $(this).prop('checked'));
    });

    // افزودن مخاطبان انتخاب‌شده به جلسه
    $('#add-selected-attendees').on('click', () => {
        $('.contact-checkbox:checked').each(function() {
            const index = $(this).data('index');
            const contact = contacts[index];
            if (!attendees.some(a => a.name === contact.name && a.mobile === contact.mobile)) {
                attendees.push({ name: contact.name, mobile: contact.mobile });
            }
        });
        updateAttendeesTable();
        showView('session-view');
        showToast(i18next.t('success_save'), 'success');
    });

    // جستجوی مخاطبان
    $('#contacts-search').on('input', function() {
        const query = $(this).val().toLowerCase();
        const filtered = contacts.filter(c => c.name.toLowerCase().includes(query) || (c.mobile && c.mobile.includes(query)));
        const tbody = $('#contacts-table tbody').empty();
        filtered.forEach((contact, index) => {
            tbody.append(`
                <tr>
                    <td><input type="checkbox" class="contact-checkbox" data-index="${contacts.indexOf(contact)}"></td>
                    <td>${index + 1}</td>
                    <td>${contact.name}</td>
                    <td>${contact.mobile || '-'}</td>
                    <td>
                        <button class="btn btn-danger btn-sm delete-contact" data-index="${contacts.indexOf(contact)}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `);
        });
    });

    // بروزرسانی جدول آرشیو
    function updateArchiveTable() {
        const tbody = $('#archive-table tbody').empty();
        sessions.forEach((session, index) => {
            tbody.append(`
                <tr>
                    <td>${index + 1}</td>
                    <td>${session.number}</td>
                    <td>${session.title}</td>
                    <td>${session.date}</td>
                    <td>
                        <button class="btn btn-primary btn-sm view-session" data-id="${session.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-danger btn-sm delete-session" data-id="${session.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `);
        });
    }

    // مشاهده جلسه
    $(document).on('click', '.view-session', function() {
        const id = $(this).data('id');
        const session = sessions.find(s => s.id === id);
        if (session) {
            currentSessionId = session.id;
            $('#session-number').val(session.number);
            $('#session-date').val(session.date);
            $('#start-time').val(session.startTime);
            $('#end-time').val(session.endTime);
            $('#session-title').val(session.title);
            $('#location').val(session.location === 'manual' ? 'manual' : session.location);
            $('#location-manual').val(session.location === 'manual' ? session.location : '').toggle(session.location === 'manual');
            $('#organizer').val(session.organizer);
            $('#notes').val(session.notes);
            attendees = session.attendees;
            decisions = session.decisions;
            updateAttendeesTable();
            updateDecisionsTable();
            showView('session-view');
        }
    });

    // حذف جلسه
    $(document).on('click', '.delete-session', function() {
        $('#password-modal').addClass('active');
        $('#modal-overlay').addClass('active');
        const id = $(this).data('id');
        $('#submit-password-btn').off('click').on('click', () => {
            if ($('#password-input').val() === password) {
                sessions = sessions.filter(s => s.id !== id);
                localStorage.setItem('sessions', JSON.stringify(sessions));
                updateArchiveTable();
                $('#password-modal, #modal-overlay').removeClass('active');
                $('#password-input').val('');
                showToast(i18next.t('success_save'), 'success');
            } else {
                showToast('رمز عبور نادرست است', 'error');
            }
        });
        $('#cancel-password-btn, #modal-overlay').on('click', () => {
            $('#password-modal, #modal-overlay').removeClass('active');
            $('#password-input').val('');
        });
    });

    // جستجوی جلسات
    $('#archive-search').on('input', function() {
        const query = $(this).val().toLowerCase();
        const filtered = sessions.filter(s => s.number.toLowerCase().includes(query) || s.title.toLowerCase().includes(query));
        const tbody = $('#archive-table tbody').empty();
        filtered.forEach((session, index) => {
            tbody.append(`
                <tr>
                    <td>${index + 1}</td>
                    <td>${session.number}</td>
                    <td>${session.title}</td>
                    <td>${session.date}</td>
                    <td>
                        <button class="btn btn-primary btn-sm view-session" data-id="${session.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-danger btn-sm delete-session" data-id="${session.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `);
        });
    });

    // مدیریت واتساپ
    $('#whatsapp-button').on('click', () => {
        if (!attendees.length) {
            showToast('هیچ شرکت‌کننده‌ای انتخاب نشده است', 'error');
            return;
        }
        $('#attendees-checkboxes').empty();
        attendees.forEach((attendee, index) => {
            $('#attendees-checkboxes').append(`
                <label>
                    <input type="checkbox" class="whatsapp-attendee" data-index="${index}" ${attendee.mobile ? '' : 'disabled'}>
                    ${attendee.name} ${attendee.mobile ? `(${attendee.mobile})` : ''}
                </label>
            `);
        });
        const summary = `
جلسه شماره: ${$('#session-number').val()}
عنوان: ${$('#session-title').val()}
تاریخ: ${$('#session-date').val()}
ساعت: ${$('#start-time').val()}
مکان: ${$('#location').val() === 'manual' ? $('#location-manual').val() : $('#location').val()}
مصوبات:
${decisions.map(d => `- ${d.text} (مسئول: ${d.responsible || '-'})`).join('\n')}
        `;
        $('#whatsapp_summary-text').val(summary.trim());
        $('#whatsapp-modal, #modal-overlay').addClass('active');
    });

    $('#send_whatsapp-btn').on('click', () => {
        const selected = $('.whatsapp-attendee:checked').map(function() {
            return attendees[$(this).data('index')].mobile;
        }).get();
        if (!selected.length) {
            showToast('هیچ شرکت‌کننده‌ای انتخاب نشده است', 'error');
            return;
        }
        const message = encodeURIComponent($('#whatsapp_summary-text').val());
        selected.forEach(mobile => {
            window.open(`https://wa.me/${mobile}?text=${message}`, '_blank');
        });
        $('#whatsapp-modal, #modal-overlay').removeClass('active');
    });

    $('#close_whatsapp-btn, #modal-overlay').on('click', () => {
        $('#whatsapp-modal, #modal-overlay').removeClass('active');
    });

    // مدیریت تنظیمات
    $('#theme').on('change', function() {
        $('body').attr('data-theme', $(this).val());
        localStorage.setItem('theme', $(this).val());
    });

    $('#font-family').on('change', function() {
        $('body').css('font-family', $(this).val());
        localStorage.setItem('font-family', $(this).val());
    });

    $('#theme-color').on('change', function() {
        $('body').attr('data-theme-color', $(this).val());
        localStorage.setItem('theme-color', $(this).val());
    });

    $('#font-size').on('change', function() {
        $('body').css('font-size', $(this).val() + 'px');
        localStorage.setItem('font-size', $(this).val());
    });

    $('#text-direction').on('change', function() {
        $('body').attr('dir', $(this).val());
        localStorage.setItem('text-direction', $(this).val());
    });

    $('#logo-size').on('change', function() {
        $('.logo').removeClass('logo-size-1 logo-size-2 logo-size-4').addClass(`logo-size-${$(this).val()}`);
        localStorage.setItem('logo-size', $(this).val());
    });

    // اعمال تنظیمات ذخیره‌شده
    if (localStorage.getItem('theme')) {
        $('#theme').val(localStorage.getItem('theme'));
        $('body').attr('data-theme', localStorage.getItem('theme'));
    }
    if (localStorage.getItem('font-family')) {
        $('#font-family').val(localStorage.getItem('font-family'));
        $('body').css('font-family', localStorage.getItem('font-family'));
    }
    if (localStorage.getItem('theme-color')) {
        $('#theme-color').val(localStorage.getItem('theme-color'));
        $('body').attr('data-theme-color', localStorage.getItem('theme-color'));
    }
    if (localStorage.getItem('font-size')) {
        $('#font-size').val(localStorage.getItem('font-size'));
        $('body').css('font-size', localStorage.getItem('font-size') + 'px');
    }
    if (localStorage.getItem('text-direction')) {
        $('#text-direction').val(localStorage.getItem('text-direction'));
        $('body').attr('dir', localStorage.getItem('text-direction'));
    }
    if (localStorage.getItem('logo-size')) {
        $('#logo-size').val(localStorage.getItem('logo-size'));
        $('.logo').addClass(`logo-size-${localStorage.getItem('logo-size')}`);
    }

    // مدیریت آکاردئون
    $('.form-section-header').on('click', function() {
        const $section = $(this).closest('.form-section');
        const $content = $section.find('.form-section-content');
        const $icon = $section.find('.accordion-icon');
        const isExpanded = $content.hasClass('active');

        $('.form-section-content').removeClass('active').attr('aria-hidden', 'true');
        $('.form-section-header').attr('aria-expanded', 'false');
        $('.accordion-icon').removeClass('rotate-down');

        if (!isExpanded) {
            $content.addClass('active').attr('aria-hidden', 'false');
            $(this).attr('aria-expanded', 'true');
            $icon.addClass('rotate-down');
        }
    });

    // تابع نمایش اعلان
    function showToast(message, type = 'success') {
        Toastify({
            text: message,
            duration: 3000,
            gravity: 'bottom',
            position: 'left',
            backgroundColor: type === 'success' ? '#22c55e' : '#ef4444',
            style: { fontFamily: "'Vazir', sans-serif", borderRadius: '10px', padding: '12px 20px' }
        }).showToast();
    }

    // لود اولیه
    updateContactsTable();
    updateArchiveTable();
    showView('session-view');
});
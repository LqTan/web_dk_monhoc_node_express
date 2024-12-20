PGDMP      6                |            course_management    17.2    17.2 $    '           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            (           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            )           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            *           1262    16389    course_management    DATABASE     �   CREATE DATABASE course_management WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1258';
 !   DROP DATABASE course_management;
                     postgres    false            �            1259    17246    class_registrations    TABLE     �  CREATE TABLE public.class_registrations (
    id uuid NOT NULL,
    "userId" uuid NOT NULL,
    "classCode" character varying(255) NOT NULL,
    "registrationDate" timestamp with time zone NOT NULL,
    status character varying(255) DEFAULT 'pending'::character varying NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 '   DROP TABLE public.class_registrations;
       public         heap r       postgres    false            �            1259    17228    classes    TABLE     f  CREATE TABLE public.classes (
    "classCode" character varying(255) NOT NULL,
    "teacherId" uuid NOT NULL,
    "courseId" character varying(255) NOT NULL,
    schedule json NOT NULL,
    "startTime" character varying(255) NOT NULL,
    "endTime" character varying(255) NOT NULL,
    room character varying(255) NOT NULL,
    "currentStudents" integer DEFAULT 0 NOT NULL,
    "maxStudents" integer NOT NULL,
    "startDate" timestamp with time zone NOT NULL,
    "endDate" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.classes;
       public         heap r       postgres    false            �            1259    17188    course_categories    TABLE     �   CREATE TABLE public.course_categories (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 %   DROP TABLE public.course_categories;
       public         heap r       postgres    false            �            1259    17193    courses    TABLE     a  CREATE TABLE public.courses (
    "courseCode" character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    price numeric(10,2) NOT NULL,
    "categoryId" uuid NOT NULL,
    description text,
    "imageUrl" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.courses;
       public         heap r       postgres    false            �            1259    17266    tuitions    TABLE     �  CREATE TABLE public.tuitions (
    id uuid NOT NULL,
    "classCode" character varying(255) NOT NULL,
    "studentId" uuid NOT NULL,
    amount numeric(10,2) NOT NULL,
    "dueDate" timestamp with time zone NOT NULL,
    status character varying(255) DEFAULT 'pending'::character varying NOT NULL,
    "paymentDate" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.tuitions;
       public         heap r       postgres    false            �            1259    17214    user_profiles    TABLE     ,  CREATE TABLE public.user_profiles (
    id uuid NOT NULL,
    "fullName" character varying(255) NOT NULL,
    "dateOfBirth" timestamp with time zone,
    gender character varying(255) NOT NULL,
    occupation character varying(255) NOT NULL,
    workplace character varying(255) NOT NULL,
    "phoneNumber" character varying(255) NOT NULL,
    "citizenId" character varying(255) NOT NULL,
    avatar character varying(255),
    "userId" uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 !   DROP TABLE public.user_profiles;
       public         heap r       postgres    false            �            1259    17205    users    TABLE       CREATE TABLE public.users (
    id uuid NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.users;
       public         heap r       postgres    false            #          0    17246    class_registrations 
   TABLE DATA           ~   COPY public.class_registrations (id, "userId", "classCode", "registrationDate", status, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    222   �6       "          0    17228    classes 
   TABLE DATA           �   COPY public.classes ("classCode", "teacherId", "courseId", schedule, "startTime", "endTime", room, "currentStudents", "maxStudents", "startDate", "endDate", "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    221   �7                 0    17188    course_categories 
   TABLE DATA           O   COPY public.course_categories (id, name, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    217   �8                 0    17193    courses 
   TABLE DATA           }   COPY public.courses ("courseCode", name, price, "categoryId", description, "imageUrl", "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    218   v<       $          0    17266    tuitions 
   TABLE DATA           �   COPY public.tuitions (id, "classCode", "studentId", amount, "dueDate", status, "paymentDate", "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    223   ?       !          0    17214    user_profiles 
   TABLE DATA           �   COPY public.user_profiles (id, "fullName", "dateOfBirth", gender, occupation, workplace, "phoneNumber", "citizenId", avatar, "userId", "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    220   �?                  0    17205    users 
   TABLE DATA           T   COPY public.users (id, email, password, role, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    219   _A       �           2606    17253 ,   class_registrations class_registrations_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.class_registrations
    ADD CONSTRAINT class_registrations_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.class_registrations DROP CONSTRAINT class_registrations_pkey;
       public                 postgres    false    222            �           2606    17255 <   class_registrations class_registrations_userId_classCode_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.class_registrations
    ADD CONSTRAINT "class_registrations_userId_classCode_key" UNIQUE ("userId", "classCode");
 h   ALTER TABLE ONLY public.class_registrations DROP CONSTRAINT "class_registrations_userId_classCode_key";
       public                 postgres    false    222    222            ~           2606    17235    classes classes_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.classes
    ADD CONSTRAINT classes_pkey PRIMARY KEY ("classCode");
 >   ALTER TABLE ONLY public.classes DROP CONSTRAINT classes_pkey;
       public                 postgres    false    221            r           2606    17192 (   course_categories course_categories_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.course_categories
    ADD CONSTRAINT course_categories_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.course_categories DROP CONSTRAINT course_categories_pkey;
       public                 postgres    false    217            t           2606    17199    courses courses_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY ("courseCode");
 >   ALTER TABLE ONLY public.courses DROP CONSTRAINT courses_pkey;
       public                 postgres    false    218            �           2606    17273    tuitions tuitions_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.tuitions
    ADD CONSTRAINT tuitions_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.tuitions DROP CONSTRAINT tuitions_pkey;
       public                 postgres    false    223            z           2606    17222 )   user_profiles user_profiles_citizenId_key 
   CONSTRAINT     m   ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT "user_profiles_citizenId_key" UNIQUE ("citizenId");
 U   ALTER TABLE ONLY public.user_profiles DROP CONSTRAINT "user_profiles_citizenId_key";
       public                 postgres    false    220            |           2606    17220     user_profiles user_profiles_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.user_profiles DROP CONSTRAINT user_profiles_pkey;
       public                 postgres    false    220            v           2606    17213    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public                 postgres    false    219            x           2606    17211    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    219            �           2606    17261 6   class_registrations class_registrations_classCode_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.class_registrations
    ADD CONSTRAINT "class_registrations_classCode_fkey" FOREIGN KEY ("classCode") REFERENCES public.classes("classCode") ON UPDATE CASCADE ON DELETE CASCADE;
 b   ALTER TABLE ONLY public.class_registrations DROP CONSTRAINT "class_registrations_classCode_fkey";
       public               postgres    false    221    222    4734            �           2606    17256 3   class_registrations class_registrations_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.class_registrations
    ADD CONSTRAINT "class_registrations_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 _   ALTER TABLE ONLY public.class_registrations DROP CONSTRAINT "class_registrations_userId_fkey";
       public               postgres    false    4728    222    219            �           2606    17241    classes classes_courseId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.classes
    ADD CONSTRAINT "classes_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public.courses("courseCode") ON UPDATE CASCADE ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.classes DROP CONSTRAINT "classes_courseId_fkey";
       public               postgres    false    221    4724    218            �           2606    17236    classes classes_teacherId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.classes
    ADD CONSTRAINT "classes_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.classes DROP CONSTRAINT "classes_teacherId_fkey";
       public               postgres    false    4728    219    221            �           2606    17200    courses courses_categoryId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.courses
    ADD CONSTRAINT "courses_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.course_categories(id) ON UPDATE CASCADE ON DELETE CASCADE;
 K   ALTER TABLE ONLY public.courses DROP CONSTRAINT "courses_categoryId_fkey";
       public               postgres    false    4722    218    217            �           2606    17274     tuitions tuitions_classCode_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tuitions
    ADD CONSTRAINT "tuitions_classCode_fkey" FOREIGN KEY ("classCode") REFERENCES public.classes("classCode") ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.tuitions DROP CONSTRAINT "tuitions_classCode_fkey";
       public               postgres    false    223    221    4734            �           2606    17279     tuitions tuitions_studentId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tuitions
    ADD CONSTRAINT "tuitions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.tuitions DROP CONSTRAINT "tuitions_studentId_fkey";
       public               postgres    false    223    4728    219            �           2606    17223 '   user_profiles user_profiles_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT "user_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 S   ALTER TABLE ONLY public.user_profiles DROP CONSTRAINT "user_profiles_userId_fkey";
       public               postgres    false    220    4728    219            #   2  x���1n�0Eg��$ER�OСG�"Qr�%���*S��I���Ւ5P���A�IaTĬ�9/jD���c�<O1g(]����%���A��1��1o�[��cZ~ǥ�\�O�xEΣ�-e�^������`��;�f�W5�CQܔ6�5�3��G��(4�Kr���J��J�1S�W-�Vdo���E�_�g�<
�b'i�\�s��t�Q�[�t��Qpnb{�6l� .Vbw���4e#�����iސt�|���㔀��AtTw��D�:����&��em�kNz�y��A���5��0���      "   �   x���;n1Dk�)��J�WZ�s�o�������`*��l�$X���9����j��Q�*�P��И�ۭ��}����>y��.@R����((@�����u���s�m,?�m&�V���wK5�fQJ���_Cv�%;2� s�o���~�h�<�w�9�?V�Q��9��=��ՖuI�dA���1z� ϖ�w�<��!��G&��-c\u�8M��#l�         �  x�}���E���ը.�n���Wa!�S���g{V3�F"�HXD b �"�}�~�xv$,w;i��W�Wu�s���f�l��U����b�6�`��N[ל��W7�n�8;��f�]ׁ=]�Pכ�F	\*.���#%R�����Ԫ$Х$y�q�5s�*���#kE�&�G�|��X����s��V�|щX�#Y*ǒ֗��M����f�{��w?���:u�O�}��1-���'7}�_LҌSs9J��"Ȋ������ ��'�D��4��=8�囲�v�X�@�a�,G��B��ra�!5p��FP���Ō͓��������������/3p^�A�RJ#��jA%�Ǫ�W@���(�<����K6,��-�Z�w���L��?7=Jm��V�!P�!*�
Z]LNB䠭n�q;�;+/��ڲ���x�Ll+�4�$�E)%5w�As�NqL2�j[k
������������rrGegaG����+�R��%�yT1����L��<�zF��1��/{����I�B�Y�Qjc�2K�8FZP�͔̳��KAA�Ss���"�ݿB���'[�Ϡ�����ҘD���I�+e�3�6He!W�������{��0��;���3Sr�Z�p4@%UN$�̚h
W�ލX 5g�E7��=Ů��A.�L8<(-�E��(���.E
)I+iA;����3
�os���C.vS3!ff�$��E�2�u�ƞ<�dd.޻(kDQ�gˎ*7���dߗ��2�����Ӽ�ԖXC�y-�z��±��H��с7Z6_�4�}(�6��L%�B)3G;J����hPyΊ\�r�z������� �w�-wԥ���RϘ�������GN�i�U�\��{a+-"6�����3�r͎�f}G���͍�����E۶�ճ�         |  x�Ŗ=o�@��˯x��rrv��-! U-RQ�N,���-�9��4�V1 f>&�*T��BA��l��и�Xz�{�y�g�S0Vр=N��؏�6��?�)v�L(�	��	��{�H��0F�;t-�t���n�X���QL�:�c�VǴо7�L��җ�Yz4����/`�M�q�ꁛ�� ��yR����z<}3K�<!Fq���2/��&��6Ұ�+��`T��w��n�y[�	5�mMA��8!�F�r8�'o�=��ا B�c�)ss-ZM-�
Ve�%��	�P��)f~���~�����ʮ�r����a��eZV�/��:5|�"�?(�۩!��*eȐ���Y���UM8��T�/HX�W{��0Udܖ�iaC�5�,$���QHY��-�k��#�&�$K/ �~)I��*j����T�$���.��p�<a\� �a��Y5A\�H��zatPͨh�YH�Z���Ѣ�e)��=��5E~�s�(�f�㷧ҵN�I*�:��g��lE��YCw��eHB;����0�y!{gIĐڹ�W|�dI$�ޞ�4�*"*�T����Y>�i��#s��^6�ȉ<at*X�w����HYײ�*\j<h5�I��      $   �   x���9n1c���E/p�'l�cp��GE��q���sF-�4�I��i�
��%�1��x���M4e���}h�D�ո�r.��	$"�ޠ��R
*������\�es�Ѣ�Ķ�����I�B�l�������֢2����Ŕ{�*���!��P��U!-q�V��zW_[��?����V�      !   �  x����nTA��9O1=����Ϝ.	��"Q��\Nv%rVB,��P :*���&�҄D� ��~_��8ff� 5p��d-m�H^��Y_�߷ž�Ş��eB��Ŭ��<�n�,�������\����p���?>n?o��p��ؓ��yQ�dP�}r�6)DC%Af�!eΐ�i�S�m������<�_����K'D4@��G�Y av1�#�y�h^�����ș�n�b�l:N[�3� �b/��|�7�������1�݈$�Q|,�,
������e��K��n�E��M^V�=�x�!(*�x� ��u�b#'C��h)���d���G9�WvM;�g��b�������ݦ��j��/ H��j�_ ��e          �  x�u�Ks�0���+�`ב�d],�
%�pq�	�t������vb~}�,���̻y�#W!��(�k 5�@������zŶ�ҢU��_�{��)�^��F=}����~�O�R�2na�. ��7S����1q�I�0?��yUm[���{u�L�VA�L bw�FTDCľ ���3��.�"	�%W�@Z��Ґy��ب�V&�g�ƞ��灘iH��%��y<X������嬛u���s��Ᶎ�I�s��)�ϋ��0��������D���	(�(���
��R��M0�j~���X��Y�x�N6�pa��l��o��m��x�����n����k0�C�c�(��ˑ?%�R�*D0D#@�S@�\B$��5��SƔMQ�x��I�:Z�GG�>d�1&��F�̓�a���bw�iE'�;ՍM���%#ʠ��?��}��t���     
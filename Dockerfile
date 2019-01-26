FROM centos:6.6
MAINTAINER Avanza Innovations <bilal.mahroof@avanzainnovations.com>


RUN rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
RUN yum groupinstall -y "Development Tools" && yum clean all && yum install -y tar

RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | bash

RUN ["/bin/bash", "-login", "-c", "nvm install 8.9.0"]
RUN ["/bin/bash", "-login", "-c", "nvm use 8.9.0"]

WORKDIR /home/avanza/app

COPY package.json .
COPY . .
RUN npm install


EXPOSE 9080

CMD [ "npm", "start"]